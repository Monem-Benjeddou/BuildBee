import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  IconButton,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  AttachMoney,
  TrendingUp,
  People,
  CalendarToday,
  MoreVert,
  Add,
} from '@mui/icons-material';
import '../../styles/payments.css';

const PaymentList = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Ce mois');

  // Sample data
  const statistics = {
    totalRevenue: '24,500 €',
    pendingPayments: '3,200 €',
    activeStudents: 142,
    paymentRate: 87,
  };

  const recentPayments = [
    {
      id: 1,
      student: 'Sophie Martin',
      amount: '350 €',
      date: '15 Dec 2023',
      status: 'Payé',
      program: 'Programme Avancé',
    },
    {
      id: 2,
      student: 'Lucas Bernard',
      amount: '250 €',
      date: '14 Dec 2023',
      status: 'En attente',
      program: 'Programme Débutant',
    },
    {
      id: 3,
      student: 'Emma Dubois',
      amount: '450 €',
      date: '13 Dec 2023',
      status: 'Payé',
      program: 'Programme Expert',
    },
    {
      id: 4,
      student: 'Thomas Petit',
      amount: '300 €',
      date: '12 Dec 2023',
      status: 'En retard',
      program: 'Programme Intermédiaire',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Payé':
        return 'success';
      case 'En attente':
        return 'warning';
      case 'En retard':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="payments-page">
      <Box className="page-header">
        <div className="header-title">
          <Typography variant="h4" component="h1">
            Gestion des paiements
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Suivez et gérez les paiements des étudiants
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          className="add-payment-btn"
        >
          Nouveau Paiement
        </Button>
      </Box>

      <Box className="period-selector">
        {['Aujourd\'hui', 'Cette semaine', 'Ce mois', 'Cette année'].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? 'contained' : 'outlined'}
            onClick={() => setSelectedPeriod(period)}
            className={selectedPeriod === period ? 'period-active' : ''}
          >
            {period}
          </Button>
        ))}
      </Box>

      <Grid container spacing={3} className="statistics-grid">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card revenue">
            <CardContent>
              <Box className="stat-header">
                <AttachMoney className="stat-icon" />
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Typography variant="h5" component="div">
                {statistics.totalRevenue}
              </Typography>
              <Typography color="textSecondary">
                Revenu total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card pending">
            <CardContent>
              <Box className="stat-header">
                <TrendingUp className="stat-icon" />
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Typography variant="h5" component="div">
                {statistics.pendingPayments}
              </Typography>
              <Typography color="textSecondary">
                Paiements en attente
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card students">
            <CardContent>
              <Box className="stat-header">
                <People className="stat-icon" />
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Typography variant="h5" component="div">
                {statistics.activeStudents}
              </Typography>
              <Typography color="textSecondary">
                Étudiants actifs
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card payment-rate">
            <CardContent>
              <Box className="stat-header">
                <CalendarToday className="stat-icon" />
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Typography variant="h5" component="div">
                {statistics.paymentRate}%
              </Typography>
              <Typography color="textSecondary">
                Taux de paiement
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={statistics.paymentRate} 
                className="progress-bar"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card className="recent-payments">
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Paiements récents
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Étudiant</TableCell>
                  <TableCell>Programme</TableCell>
                  <TableCell>Montant</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.student}</TableCell>
                    <TableCell>{payment.program}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={payment.status}
                        color={getStatusColor(payment.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentList;
