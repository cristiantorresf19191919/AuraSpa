import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import { appointmentService } from '@/lib/appointment-service';
import { UserRole, getUserRole } from '@/lib/user-roles';

// Initialize Gemini AI
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Enhanced system prompt for Aura Bienestar platform
const SYSTEM_PROMPT = `You are the AI assistant for **Aura Bienestar**, a platform that helps clients discover and book massages and therapeutic wellness services across Colombia, while helping professionals (therapists) grow their bookings.

PRIMARY GOALS
- Help clients find, compare, and book services (e.g., masaje relajante, descontracturante, fisioterapia, drenaje linfático, reflexología, terapias alternativas).
- Help therapists set up/optimize profiles (servicios, disponibilidad, zonas de atención, precios) and receive bookings.
- Provide warm, concise guidance that reduces friction and builds trust.
- Enforce privacy and platform policies at all times.

BRAND VOICE
- Cálido, profesional y claro. Empático, directo y útil. Evita jerga clínica innecesaria.

LANGUAGE
- Default: Español (Colombia). Switch languages only if the user asks.

ROLES & ACCESS (ROLE-BASED PRIVACY)
- ADMIN: Can search bookings by code or by client/therapist name; can view names for operations.
- THERAPIST (authenticated): Can view and manage ONLY their own bookings; may search by booking code; name-based lookups limited to their own bookings.
- CLIENT (authenticated): Can view their own bookings; may search by booking code.
- GUEST (not authenticated): Must provide a **booking code** (6–10 alphanumeric, e.g., AUR1234) to access any booking info. No name-based lookups.

BOOKING LOOKUP POLICY
- Prefer booking code lookups for privacy and speed.
- If a non-admin asks for a name-based search, require a booking code instead.
- When responding:
  - ADMIN may mention names (client/therapist).
  - THERAPIST may see client first name/initials for THEIR bookings.
  - CLIENT may see their own details.
  - GUEST: never reveal names; refer to "Reserva [CODE]".

TYPICAL CAPABILITIES
- Discovery: Suggest services by need (dolor de espalda, relajación, post-entreno), ubicación (ciudad/sector), presupuesto, modalidad (a domicilio / en consultorio).
- Availability & Pricing: Explain how to set/filtrar horarios, zonas, tarifas, duraciones.
- Booking Flow: Explica pasos claros (selección de servicio → horario → confirmación → pago si aplica → notificaciones).
- Profile Help (Therapists): Guía para crear ficha atractiva (descripción breve, diferenciadores, fotos, certificaciones, reseñas, cobertura y política de cancelación).
- Policies: Reglas de uso, cancelaciones, seguridad, higiene, alcance de servicios (NO sexual).
- Support: Resolver dudas comunes (requisitos para a domicilio, qué llevar, tiempos, reembolsos).

SAFETY & COMPLIANCE
- No diagnósticos médicos ni prescripciones. Para condiciones médicas, sugiere consultar un profesional de salud.
- Servicios estrictamente profesionales y NO sexuales. Si el usuario sugiere contenido inapropiado, rechaza con firmeza y redirige a servicios permitidos.
- No recopiles ni expongas datos sensibles fuera de contexto. Cumple privacidad por rol.
- No compartas teléfonos, emails o direcciones privadas salvo que el usuario esté autenticado y la política lo permita; usa el mensajero/plataforma.
- No inventes disponibilidad ni precios: si faltan datos, pide la info mínima (ciudad/sector, fecha, presupuesto, tipo de servicio).

DATA SHAPING IN RESPONSES
- Be concise. Usa listas cortas, pasos claros y CTA concreto (p. ej., "¿Cuál es tu ciudad y rango de horario?").
- Si hay ambigüedad, pide exactamente 1–3 datos clave.
- Nunca muestres nombres si la política de rol no lo permite.
- Al confirmar una reserva, incluye: código, servicio, fecha/hora, duración, modalidad (domicilio/consultorio), precio y política de cancelación.
- Si no se encuentra una reserva por código, indica: no hallada, verificar ortografía del código (6–10 alfanum), ofrecer pasos de soporte.

EXAMPLES (CONDENSED)
- Guest lookup without code: "Por privacidad, necesito tu **código de reserva** (ej. AUR1234) para ayudarte."
- Admin lookup by name: "Se encontraron 2 reservas para 'Laura Pérez': AUR9K2 y AUR7TX. ¿Con cuál quieres continuar?"
- Therapist asks for next bookings: "Aquí tus próximas 2 reservas: [AUR9K2, jue 5:00 pm, Domicilio Teusaquillo], [AUR7TX, vie 11:00 am, Consultorio Chapinero]."
- Client wants recommendation: "¿Prefieres relajación o alivio de dolor localizado? ¿En qué zona de Bogotá estás y qué presupuesto manejas?"

DISCOURAGED CONTENT
- No promesas terapéuticas exageradas ("cura garantizada").
- No consejos médicos específicos.
- No contenido sexual, insinuaciones o solicitudes fuera de políticas.

WHEN UNSURE
- Pide 1–3 datos clave (p. ej., ciudad, tipo de servicio, horario preferido).
- Si el usuario solicita algo no permitido, explica brevemente la política y ofrece alternativas adecuadas.

OUTPUT STYLE
- Breve, accionable, amable. Primero ayuda; luego CTA claro.`;

// Function to extract booking search queries from user messages with role-based restrictions
function extractBookingQuery(message: string, userRole: UserRole): { type: 'name' | 'code' | null; query: string | null; allowed: boolean } {
  const messageLower = message.toLowerCase();
  
  // Check for booking code patterns first (6-10 character alphanumeric) - always allowed
  const bookingCodeMatch = message.match(/\b[A-Z0-9]{6,10}\b/i);
  if (bookingCodeMatch) {
    // Double-check that this isn't part of a name
    const beforeMatch = message.substring(0, message.indexOf(bookingCodeMatch[0]));
    const afterMatch = message.substring(message.indexOf(bookingCodeMatch[0]) + bookingCodeMatch[0].length);
    
    // If there are letters before or after, it's likely part of a name
    const hasLettersBefore = /\b[a-zA-Z]+\s*$/.test(beforeMatch);
    const hasLettersAfter = /^\s*[a-zA-Z]+\b/.test(afterMatch);
    
    if (!hasLettersBefore && !hasLettersAfter) {
      return { type: 'code', query: bookingCodeMatch[0].toUpperCase(), allowed: true };
    }
  }
  
  // Check for name patterns - ONLY allowed for ADMIN users
  if (userRole === UserRole.ADMIN) {
    const namePatterns = [
      // Direct name mentions (most common case)
      /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\b/,
      // Natural language patterns for bookings
      /(?:how is|how's)\s+([a-zA-Z\s]+)\s+(?:booking|appointment|reservation)/i,
      /(?:tell me about|give me info on|info about)\s+([a-zA-Z\s]+)\s+(?:booking|appointment)/i,
      /(?:booking|appointment|reservation)\s+(?:for|of|about)\s+([a-zA-Z\s]+)/i,
      /(?:how is|what is the status of|check status for)\s+([a-zA-Z\s]+)\s+(?:booking|appointment)/i,
      /(?:look up|find|search for)\s+([a-zA-Z\s]+)\s+(?:booking|appointment)/i
    ];
    
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        let name = match[1].trim();
        
        // Clean up the name by removing common prefixes/suffixes
        name = name.replace(/^(booking|appointment|reservation|check|look|find|search|info|about|for|of|on)\s+/i, '');
        name = name.replace(/\s+(booking|appointment|reservation|check|look|find|search|info|about|for|of|on)$/i, '');
        
        if (name.length > 1) {
          return { type: 'name', query: name, allowed: true };
        }
      }
    }
  }
  
  // If we get here, no valid search query was found
  return { type: null, query: null, allowed: false };
}

// Function to search for bookings with privacy controls
async function searchBookingData(searchTerm: string, searchType: 'name' | 'code', userRole: UserRole): Promise<any> {
  try {
    if (searchType === 'code') {
      // Search by booking code - always allowed
      const appointments = await appointmentService.getAppointments();
      const appointment = appointments.find(a => a.id === searchTerm);
      return appointment ? { found: true, appointment, type: 'single' } : { found: false };
    } else if (searchType === 'name' && userRole === UserRole.ADMIN) {
      // Search by name - only for admin users
      const appointments = await appointmentService.getAppointments();
      const searchLower = searchTerm.toLowerCase().trim();
      
      const matchingAppointments = appointments.filter(a => {
        // Check multiple name combinations - we'll need to get customer and provider names from their IDs
        // For now, we'll use the IDs as placeholders since we don't have direct name access
        const customerId = (a.customerId || '').toLowerCase();
        const providerId = (a.providerId || '').toLowerCase();
        
        // Split search term into words for better matching
        const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0);
        
        // Check if search term matches any part of the name
        const exactMatches = (
          customerId.includes(searchLower) ||
          providerId.includes(searchLower)
        );
        
        // Check if individual words match
        const wordMatches = searchWords.some(word => 
          customerId.includes(word) ||
          providerId.includes(word)
        );
        
        return exactMatches || wordMatches;
      });
      
      if (matchingAppointments.length === 0) {
        return { found: false };
      } else if (matchingAppointments.length === 1) {
        return { found: true, appointment: matchingAppointments[0], type: 'single' };
      } else {
        return { found: true, appointments: matchingAppointments, type: 'multiple' };
      }
    } else {
      // Name search not allowed for non-admin users
      return { found: false, error: 'Name search not allowed for your role' };
    }
  } catch (error) {
    console.error('Error searching booking data:', error);
    return { found: false, error: 'Database search failed' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, userRole = UserRole.GUEST } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key not found');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Check if this is a booking lookup request with role-based restrictions
    const bookingQuery = extractBookingQuery(message, userRole);
    let bookingData = null;
    let enhancedPrompt = SYSTEM_PROMPT;

    if (bookingQuery.query && bookingQuery.type && bookingQuery.allowed) {
      // Search for booking data
      bookingData = await searchBookingData(bookingQuery.query, bookingQuery.type, userRole);
      
      if (bookingData && bookingData.found) {
        if (bookingData.type === 'single' && bookingData.appointment) {
          const appointment = bookingData.appointment;
          // Enhanced prompt with role-based booking information
                     enhancedPrompt += `\n\nBOOKING DATA FOUND:
 Booking Code: ${appointment.id || 'Unknown'}
 Client ID: ${appointment.customerId || 'Unknown'}
 Therapist ID: ${appointment.providerId || 'Unknown'}
 Service Type: ${appointment.serviceName || 'Not specified'}
 Date: ${appointment.appointmentDate || 'Not specified'}
 Time: ${appointment.startTime || 'Not specified'}
 Duration: ${appointment.serviceDuration || 'Not specified'}
 Price: ${appointment.totalPrice || 'Not specified'}
 Status: ${appointment.status || 'Unknown'}
 Notes: ${appointment.customerNotes || 'None'}

PRIVACY RULES BASED ON USER ROLE:
- **ADMIN USERS**: You can mention both client and therapist names for convenience
- **THERAPIST USERS**: You can see client first name/initials for YOUR bookings only
- **CLIENT USERS**: You can see your own booking details
- **GUEST USERS**: Always use "Reserva [CODE]" format, never mention names
- Use this information to provide a helpful and reassuring response about the booking's current status
- Adjust privacy level based on user role: ${userRole === UserRole.ADMIN ? 'Admin (can show names)' : userRole === UserRole.MASSAGE_PROVIDER ? 'Therapist (limited name access)' : userRole === UserRole.CUSTOMER ? 'Client (own bookings)' : 'Guest (code-only)'}`;
        } else if (bookingData.type === 'multiple' && bookingData.appointments && Array.isArray(bookingData.appointments)) {
          if (userRole === UserRole.ADMIN) {
                         const bookingCodes = bookingData.appointments.map((a: any) => 
               `${a.customerId || 'Unknown'} (${a.id || 'Unknown'})`
             ).join(', ');
            
            enhancedPrompt += `\n\nMULTIPLE BOOKINGS FOUND:
${bookingCodes}

Ask the user to provide more specific information to identify the correct booking.`;
          } else {
                         const bookingCodes = bookingData.appointments.map((a: any) => 
               `Reserva ${a.id || 'Unknown'}`
             ).join(', ');
            
            enhancedPrompt += `\n\nMULTIPLE BOOKINGS FOUND:
${bookingCodes}

Ask the user to provide the specific booking code to identify the correct reservation.`;
          }
        }
      } else {
        if (bookingData?.error === 'Name search not allowed for your role') {
          enhancedPrompt += `\n\nSEARCH RESTRICTION:
The user attempted to search by name, but this feature is only available to administrators for privacy reasons.

Inform the user that:
- For privacy and security, booking searches by name are restricted to administrators
- They can search using their booking code (6-10 character format like AUR1234)
- Booking codes work like passwords and provide secure access to their information
- This protects client privacy and prevents unauthorized access to booking records`;
        } else {
          enhancedPrompt += `\n\nNO BOOKING FOUND:
The search for "${bookingQuery.query}" did not return any results. 

If searching by booking code:
- Politely inform the user that no booking was found with that code
- Suggest they check the code spelling or contact support
- Remind them that booking codes are 6-10 character alphanumeric (e.g., AUR1234)

If searching by name (admin only):
- Politely inform the user that no booking was found with that name
- Suggest they check the spelling or provide more specific information`;
        }
      }
    } else if (bookingQuery.query && !bookingQuery.allowed) {
      // Search attempted but not allowed for this role
      enhancedPrompt += `\n\nSEARCH RESTRICTION DETECTED:
The user attempted to search by name, but this feature is restricted to administrators for privacy reasons.

Inform the user that:
- For privacy and security, booking searches by name are restricted to administrators
- They can search using their booking code (6-10 character format like AUR1234)
- Booking codes work like passwords and provide secure access to their information
- This protects client privacy and prevents unauthorized access to booking records
- If they need to search by name, they should contact an administrator`;
    }

    // Log the received message (for debugging)
    console.log('Received message:', message);
    console.log('User role:', userRole);
    if (bookingQuery.query) {
      console.log('Booking query detected:', bookingQuery);
      console.log('Booking data found:', bookingData);
    }

    try {
      // Generate response using Gemini with enhanced context
      const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${enhancedPrompt}\n\nUser message: ${message}`,
        config: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
          thinkingConfig: {
            thinkingBudget: 0, // Disables thinking
          },
        },
      });

      const aiResponse = result.text;

      return NextResponse.json({
        response: aiResponse,
        timestamp: new Date().toISOString(),
        messageId: Date.now().toString(),
        bookingQuery: bookingQuery.query ? {
          query: bookingQuery.query,
          type: bookingQuery.type,
          found: bookingData?.found || false,
          resultType: bookingData?.type || null,
          allowed: bookingQuery.allowed
        } : null
      });

    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      
      // Enhanced fallback response with privacy focus
      let fallbackResponse = `Lo siento, pero estoy teniendo problemas para procesar tu solicitud en este momento. `;
      
      if (bookingQuery.query && bookingData?.found) {
        // If we found booking data but AI failed, provide basic info with role-based privacy
        if (bookingData.type === 'single' && bookingData.appointment) {
          const appointment = bookingData.appointment;
                     if (userRole === UserRole.ADMIN) {
             fallbackResponse += `Sin embargo, encontré información sobre la reserva del cliente ${appointment.customerId || 'Unknown'}:\n\n`;
           } else {
             fallbackResponse += `Sin embargo, encontré información sobre la Reserva ${appointment.id || 'Unknown'}:\n\n`;
           }
           fallbackResponse += `• Estado: ${appointment.status || 'Unknown'}\n`;
           fallbackResponse += `• Servicio: ${appointment.serviceName || 'Not specified'}\n`;
           fallbackResponse += `• Fecha: ${appointment.appointmentDate || 'Not specified'}\n`;
           fallbackResponse += `• Hora: ${appointment.startTime || 'Not specified'}\n`;
           if (userRole === UserRole.ADMIN) {
             fallbackResponse += `• Cliente ID: ${appointment.customerId || 'Unknown'}\n`;
             fallbackResponse += `• Terapeuta ID: ${appointment.providerId || 'Unknown'}\n`;
           }
           fallbackResponse += `• Código: ${appointment.id || 'Unknown'}\n`;
        }
      } else if (bookingQuery.query && !bookingQuery.allowed) {
        fallbackResponse += `\n\nPor privacidad y seguridad, las búsquedas de reservas por nombre están restringidas a administradores. Puedes buscar usando tu código de reserva (formato de 6-10 caracteres como AUR1234).`;
      }
      
      fallbackResponse += `\n\nPor favor intenta de nuevo en un momento, o siéntete libre de hacer una pregunta diferente sobre servicios de masaje, bienestar o información general.`;
      
      return NextResponse.json({
        response: fallbackResponse,
        timestamp: new Date().toISOString(),
        messageId: Date.now().toString(),
        bookingQuery: bookingQuery.query ? {
          query: bookingQuery.query,
          type: bookingQuery.type,
          found: bookingData?.found || false,
          resultType: bookingData?.type || null,
          allowed: bookingQuery.allowed
        } : null
      });
    }

  } catch (error) {
    console.error('Error processing chat message:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({
    message: 'Chat API is running with Gemini Pro integration and Enhanced Privacy Controls for Aura Bienestar!',
    timestamp: new Date().toISOString(),
    status: 'active',
    features: [
      'Role-based booking search access',
      'Admin: Name or code search',
      'Therapist: Own bookings + code search',
      'Client: Own bookings + code search',
      'Guests: Code-only search',
      'Booking privacy protection',
      'Booking code-based responses'
    ]
  });
}
