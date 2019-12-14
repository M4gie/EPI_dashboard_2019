import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Switch, Route } from 'react-router-dom';
import '../styles/index.css';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';
import Footer from '../components/Footer';

const Authentication = () => {
  const styles = StyleSheet.create({
    container: {
      maxWidth: '480px',
      minWidth: '300px',
      padding: '20px',
      color: 'white'
    }
  });

  return (
    <div
      className={'flex h-screen'}
      style={{
        background:
          'linear-gradient(15deg, rgba(35,43,64,1) 25%, rgba(44,55,89,1) 50%, rgba(58,74,128,1) 75%, rgba(103,135,252,1) 100%)'
      }}
    >
      <div className={'m-auto'}>
        <div className={css(styles.container)}>
          <section>
            <h1
              className={'font-bold sm:text-4xl text-center my-2 text-xl'}
              style={{ letterSpacing: 10 }}
            >
              &nbsp;UNDERSCORE<span className={'blinking'}>_</span>
            </h1>
          </section>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Authentication;
