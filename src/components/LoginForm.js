
import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from './common';


class LoginForm extends Component {
  
  state = { 
    email: '', 
    password: '', 
    error: '', 
    loading: false 
  };

  // 로그인 버튼 클릭시
  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    // firebase 로그인 
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(() => {
      // firebase 로그인 실패 시 회원가입 시도 
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      // 다 실패하면 에러 메시지 보여주기
      .catch(this.onLoginFail.bind(this));
    });
  }

  // 로그인 성공했다면...
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  // 로그인 실패했다면...
  onLoginFail() {
    this.setState({      
      loading: false,
      error: 'Auth fail...'
    });
  }

  // 로그인 시도 시 스피너 보여줌...
  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />;
    }

    return (
      <Button onPress={() => this.onButtonPress()}>
        Log in
      </Button>
    );
  }
  
  render() {
    return (
      <Card>
          <CardSection>
            <Input 
              placeholder='user@test.com'
              label='email'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>
          <CardSection>
            <Input 
              secureTextEntry
              placeholder='input password'
              label='password'               
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
          <CardSection>
            {this.renderButton()}
          </CardSection>          
      </Card>
    );
  }
  
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
