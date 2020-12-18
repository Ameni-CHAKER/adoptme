import AuthForm, { STATE_LOGIN } from '../components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';

import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from '../utils/constants';

import {
  //MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty,
} from 'react-icons/md';

class AuthPage extends React.Component {
  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/');
    } else {
      this.props.history.push('/signup');
    }
  };

  notification(lvl,msg,ps){

    setTimeout(() => {
      if (!this.notificationSystem) {
        return;
      }
  
      this.notificationSystem.addNotification({
        title: <MdLoyalty />,
        message:
          msg,
        level: lvl,
        position:ps,
      });
    }, 1500);
  }

  handleLogoClick = () => {
    this.props.history.push('/home');
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            />
          </Card>
        </Col>

        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />

      </Row>
    );
  }
}

export default AuthPage;
