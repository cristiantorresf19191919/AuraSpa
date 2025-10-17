'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { UserRole } from '@/lib/user-roles';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Chip,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  CircularProgress,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Paper,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Spa as SpaIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  History as HistoryIcon,
  CloudUpload as UploadIcon,
  Image as ImageIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { massageServiceManager } from '@/lib/massage-service';
import { appointmentService } from '@/lib/appointment-service';
import { MassageService, MASSAGE_CATEGORIES } from '@/lib/massage-types';
import { Appointment, AppointmentStatus } from '@/lib/appointment-types';
import BrandButton from '@/components/BrandButton';
import BrandLoader from '@/components/BrandLoader';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DashboardPage() {
  const { user, userRole } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [services, setServices] = useState<MassageService[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    category: 'barberia' as any,
    imageUrl: '',
    isActive: true
  });
  const [activeStep, setActiveStep] = useState(0);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      if (userRole === UserRole.MASSAGE_PROVIDER) {
        const [userServices, userAppointments] = await Promise.all([
          massageServiceManager.getServicesByProvider(user!.uid),
          appointmentService.getProviderAppointments(user!.uid)
        ]);
        setServices(userServices);
        setAppointments(userAppointments);
      } else if (userRole === UserRole.CUSTOMER) {
        const userAppointments = await appointmentService.getCustomerAppointments(user!.uid);
        setAppointments(userAppointments);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenServiceDialog = () => {
    setOpenServiceDialog(true);
    setActiveStep(0);
    setServiceFormData({
      name: '',
      description: '',
      duration: 60,
      price: 0,
      category: 'barberia',
      imageUrl: '',
      isActive: true
    });
    setImagePreview('');
  };

  const handleCloseServiceDialog = () => {
    setOpenServiceDialog(false);
    setActiveStep(0);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setServiceFormData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveService = async () => {
    try {
      if (!user) return;

      await massageServiceManager.addService({
        ...serviceFormData,
        providerId: user.uid
      });

      handleCloseServiceDialog();
      loadDashboardData();
    } catch (error) {
      console.error('Error saving service:', error);
      setError('Failed to save service');
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (window.confirm(t('are.you.sure'))) {
      try {
        await appointmentService.cancelAppointment(appointmentId);
        loadDashboardData();
      } catch (error) {
        console.error('Error cancelling appointment:', error);
      }
    }
  };

  const handleUpdateStatus = async (appointmentId: string, newStatus: AppointmentStatus) => {
    try {
      await appointmentService.updateAppointmentStatus(appointmentId, newStatus);
      loadDashboardData();
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const getUpcomingAppointments = () => {
    const now = new Date();
    return appointments.filter(apt =>
      apt.appointmentDate > now &&
      apt.status !== AppointmentStatus.CANCELLED &&
      apt.status !== AppointmentStatus.COMPLETED
    ).sort((a, b) => a.appointmentDate.getTime() - b.appointmentDate.getTime());
  };

  const getPastAppointments = () => {
    const now = new Date();
    return appointments.filter(apt =>
      apt.appointmentDate <= now ||
      apt.status === AppointmentStatus.CANCELLED ||
      apt.status === AppointmentStatus.COMPLETED
    ).sort((a, b) => b.appointmentDate.getTime() - a.appointmentDate.getTime());
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getStatusLabel = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING: return 'Pending';
      case AppointmentStatus.CONFIRMED: return 'Confirmed';
      case AppointmentStatus.IN_PROGRESS: return 'In Progress';
      case AppointmentStatus.COMPLETED: return 'Completed';
      case AppointmentStatus.CANCELLED: return 'Cancelled';
      case AppointmentStatus.NO_SHOW: return 'No Show';
      default: return status;
    }
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING: return '#F59E0B';
      case AppointmentStatus.CONFIRMED: return '#3B82F6';
      case AppointmentStatus.IN_PROGRESS: return '#8B5CF6';
      case AppointmentStatus.COMPLETED: return '#10B981';
      case AppointmentStatus.CANCELLED: return '#EF4444';
      case AppointmentStatus.NO_SHOW: return '#6B7280';
      default: return '#6B7280';
    }
  };

  if (loading) {
    return <BrandLoader fullScreen message={t('loading')} />;
  }

  if (!user) {
    return null;
  }

  const steps = [t('service.details'), t('pricing.duration'), t('visibility.settings')];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            {t('welcome.back.name', { name: user.email?.split('@')[0] || 'User' })}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {userRole === UserRole.MASSAGE_PROVIDER ? t('manage.services.appointments') : t('view.appointments.history')}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, textAlign: 'center' }}>
              <CardContent>
                <CalendarIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {getUpcomingAppointments().length}
                </Typography>
                <Typography color="text.secondary">
                  {t('upcoming.appointments')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, textAlign: 'center' }}>
              <CardContent>
                <HistoryIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {getPastAppointments().length}
                </Typography>
                <Typography color="text.secondary">
                  {t('past.appointments')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {userRole === UserRole.MASSAGE_PROVIDER && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 3, textAlign: 'center' }}>
                  <CardContent>
                    <SpaIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {services.length}
                    </Typography>
                    <Typography color="text.secondary">
                      {t('total.services')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 3, textAlign: 'center' }}>
                  <CardContent>
                    <CheckCircleIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {services.filter(s => s.isActive).length}
                    </Typography>
                    <Typography color="text.secondary">
                      {t('active.services')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>

        {/* Quick Actions for Providers */}
        {userRole === UserRole.MASSAGE_PROVIDER && (
          <Card sx={{ mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)', color: 'white' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {t('quick.actions')}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {t('post.new.service')} to attract more customers
                  </Typography>
                </Box>
                <BrandButton
                  onClick={handleOpenServiceDialog}
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)'
                    }
                  }}
                >
                  {t('post.new.service')}
                </BrandButton>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Card sx={{ borderRadius: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
              <Tab label={t('upcoming.appointments')} icon={<ScheduleIcon />} iconPosition="start" />
              <Tab label={t('past.appointments')} icon={<HistoryIcon />} iconPosition="start" />
              {userRole === UserRole.MASSAGE_PROVIDER && (
                <Tab label={t('my.services')} icon={<SpaIcon />} iconPosition="start" />
              )}
            </Tabs>
          </Box>

          {/* Tab Panels */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {t('upcoming.appointments')}
              </Typography>
              {userRole === UserRole.CUSTOMER && (
                <BrandButton
                  component="a"
                  href="/"
                  startIcon={<AddIcon />}
                >
                  {t('book.new.appointment')}
                </BrandButton>
              )}
            </Box>

            {getUpcomingAppointments().length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <ScheduleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  {t('no.upcoming.appointments')}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  {userRole === UserRole.CUSTOMER
                    ? t('ready.to.relax')
                    : t('no.upcoming.scheduled')
                  }
                </Typography>
                {userRole === UserRole.CUSTOMER && (
                  <BrandButton
                    component="a"
                    href="/"
                    startIcon={<AddIcon />}
                  >
                    {t('browse.services')}
                  </BrandButton>
                )}
              </Box>
            ) : (
              <List>
                {getUpcomingAppointments().map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ListItem
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper'
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                              {appointment.serviceName}
                            </Typography>
                            <Chip
                              label={getStatusLabel(appointment.status)}
                              sx={{
                                bgcolor: getStatusColor(appointment.status),
                                color: 'white',
                                fontWeight: 600
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CalendarIcon fontSize="small" color="action" />
                                <Typography variant="body2">
                                  {formatDate(appointment.appointmentDate)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <TimeIcon fontSize="small" color="action" />
                                <Typography variant="body2">
                                  {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              ${appointment.totalPrice} • {appointment.serviceDuration} minutes
                            </Typography>
                            {appointment.customerNotes && (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Notes: {appointment.customerNotes}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {userRole === UserRole.CUSTOMER && appointment.status === AppointmentStatus.PENDING && (
                            <IconButton
                              onClick={() => handleCancelAppointment(appointment.id!)}
                              color="error"
                              size="small"
                            >
                              <CancelIcon />
                            </IconButton>
                          )}
                          {userRole === UserRole.MASSAGE_PROVIDER && (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {appointment.status === AppointmentStatus.PENDING && (
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleUpdateStatus(appointment.id!, AppointmentStatus.CONFIRMED)}
                                >
                                  Confirm
                                </Button>
                              )}
                              {appointment.status === AppointmentStatus.CONFIRMED && (
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleUpdateStatus(appointment.id!, AppointmentStatus.IN_PROGRESS)}
                                >
                                  Start
                                </Button>
                              )}
                              {appointment.status === AppointmentStatus.IN_PROGRESS && (
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleUpdateStatus(appointment.id!, AppointmentStatus.COMPLETED)}
                                >
                                  Complete
                                </Button>
                              )}
                            </Box>
                          )}
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < getUpcomingAppointments().length - 1 && <Divider />}
                  </motion.div>
                ))}
              </List>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              {t('past.appointments')}
            </Typography>

            {getPastAppointments().length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <HistoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  {t('no.past.appointments')}
                </Typography>
              </Box>
            ) : (
              <List>
                {getPastAppointments().map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ListItem
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        opacity: 0.8
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                              {appointment.serviceName}
                            </Typography>
                            <Chip
                              label={getStatusLabel(appointment.status)}
                              sx={{
                                bgcolor: getStatusColor(appointment.status),
                                color: 'white',
                                fontWeight: 600
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CalendarIcon fontSize="small" color="action" />
                                <Typography variant="body2">
                                  {formatDate(appointment.appointmentDate)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <TimeIcon fontSize="small" color="action" />
                                <Typography variant="body2">
                                  {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              ${appointment.totalPrice} • {appointment.serviceDuration} minutes
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < getPastAppointments().length - 1 && <Divider />}
                  </motion.div>
                ))}
              </List>
            )}
          </TabPanel>

          {userRole === UserRole.MASSAGE_PROVIDER && (
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {t('my.services')}
                </Typography>
                <BrandButton
                  onClick={handleOpenServiceDialog}
                  startIcon={<AddIcon />}
                >
                  {t('post.new.service')}
                </BrandButton>
              </Box>

              {services.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <SpaIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    {t('no.services.yet')}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {t('start.adding.service')}
                  </Typography>
                  <BrandButton
                    onClick={handleOpenServiceDialog}
                    startIcon={<AddIcon />}
                  >
                    {t('add.first.service')}
                  </BrandButton>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card sx={{ height: '100%' }}>
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1 }}>
                                {service.name}
                              </Typography>
                              <Chip
                                label={service.isActive ? t('active') : t('inactive')}
                                color={service.isActive ? 'success' : 'default'}
                                size="small"
                              />
                            </Box>

                            <Typography color="text.secondary" sx={{ mb: 2, minHeight: '3em' }}>
                              {service.description}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                              <Chip
                                label={MASSAGE_CATEGORIES.find(c => c.value === service.category)?.label}
                                size="small"
                                variant="outlined"
                              />
                              <Typography variant="body2" color="text.secondary">
                                {service.duration} {t('min')}
                              </Typography>
                            </Box>

                            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                              ${service.price}
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              )}
            </TabPanel>
          )}
        </Card>
      </Container>

      {/* Service Posting Dialog */}
      <Dialog
        open={openServiceDialog}
        onClose={handleCloseServiceDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('post.new.service')}
          </Typography>
          <IconButton onClick={handleCloseServiceDialog} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step 1: Service Details */}
          {activeStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                {t('service.details')}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('service.name')}
                    value={serviceFormData.name}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('description')}
                    value={serviceFormData.description}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>{t('category')}</InputLabel>
                    <Select
                      value={serviceFormData.category}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })}
                      label={t('category')}
                    >
                      {MASSAGE_CATEGORIES.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span>{category.icon}</span>
                            {category.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {/* Step 2: Pricing & Duration */}
          {activeStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                {t('pricing.duration')}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('duration.minutes')}
                    type="number"
                    value={serviceFormData.duration}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, duration: parseInt(e.target.value) })}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('price')}
                    type="number"
                    value={serviceFormData.price}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, price: parseFloat(e.target.value) })}
                    required
                  />
                </Grid>
              </Grid>
            </motion.div>
          )}

          {/* Step 3: Visibility Settings */}
          {activeStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                {t('visibility.settings')}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={serviceFormData.isActive}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, isActive: e.target.checked })}
                      />
                    }
                    label={t('service.active.visible')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    {t('upload.image')}
                  </Typography>

                  <Box
                    sx={{
                      border: '2px dashed',
                      borderColor: 'primary.main',
                      borderRadius: 2,
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        bgcolor: 'rgba(139, 92, 246, 0.05)'
                      }
                    }}
                    component="label"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />

                    {imagePreview ? (
                      <Box>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '200px',
                            borderRadius: '8px',
                            marginBottom: '16px'
                          }}
                        />
                        <Typography variant="body2" color="primary">
                          {t('image.preview')}
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        <Typography variant="body1" color="text.secondary">
                          {t('drag.drop.image')}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </motion.div>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button onClick={handleCloseServiceDialog}>
            {t('cancel')}
          </Button>

          {activeStep > 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>
              {t('back')}
            </Button>
          )}

          {activeStep < steps.length - 1 ? (
            <BrandButton onClick={() => setActiveStep(activeStep + 1)}>
              {t('next')}
            </BrandButton>
          ) : (
            <BrandButton onClick={handleSaveService} startIcon={<SaveIcon />}>
              {t('save.service')}
            </BrandButton>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
