import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import 'firebase/app';
import 'firebase/database';
import InputData from './components/InputData';
import Header from './components/Header';
import Button from './components/Button';
import Person from './components/Person';
import Data from './components/Data';

const firebaseConfig = {
  apiKey: 'AIzaSyAZuDf36WIPlcHQ2QKFwIK8R-d5T11HXvc',
  authDomain: 'reto-spsa-5b459.firebaseapp.com',
  databaseURL: 'https://reto-spsa-5b459.firebaseio.com',
  projectId: 'reto-spsa-5b459',
  storageBucket: 'reto-spsa-5b459.appspot.com',
  messagingSenderId: '129485154670',
  appId: '1:129485154670:web:d088bb15b71394b2'
};

firebase.initializeApp(firebaseConfig);

class FormApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form>
        <InputData
          id='name'
          text='Nombre'
          htmlFor='name'
          typeInput='text'
          placeholder='Ingresa tu nombre'
        />
        <InputData
          id='lastname'
          text='Apellido'
          htmlFor='lastname'
          typeInput='text'
          placeholder='Ingresa tu apellido'
        />
        <InputData
          id='age'
          text='Edad'
          htmlFor='age'
          typeInput='text'
          placeholder='Ingresa tu edad'
        />
        <InputData
          id='born'
          text='Fecha de nacimiento'
          htmlFor='born'
          typeInput='text'
          placeholder='Ingresa tu fecha de nacimiento'
        />
        <Button
          text='Regístrate'
          idBtn='registrar-cliente'
          href='#'
          handleClick={this.handleSubmit}
        />
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const date = new Date().getFullYear();

    const name = document.getElementById('name');
    const lastname = document.getElementById('lastname');
    const age = document.getElementById('age');
    const born = document.getElementById('born');
    let death = (date - Number(age.value)) + 79;

    const data = {
      'name': name.value,
      'lastname': lastname.value,
      'age': age.value,
      'born': born.value,
      'death': death
    };
    this.saveContactForm(data);
  }

  saveContactForm(data) {
    firebase.database().ref('persons').push(data)
      .then(function () {
        alert('Te hemos registrado correctamente!');
        document.getElementById('name').value = '';
        document.getElementById('lastname').value = '';
        document.getElementById('age').value = '';
        document.getElementById('born').value = '';
      })
      .catch(function () {
        alert('Error al registrarte :(');
      });
  }
}

class ListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      view: 'persons'
    };
    this.handleMoreDataClick = this.handleMoreDataClick.bind(this);
    this.handleAgeProm = this.handleAgeProm.bind(this);
    this.handleDeviation = this.handleDeviation.bind(this);
  }

  handleAgeProm() {
    let tot = 0;

    const persons = this.state.persons;
    persons.map(a => tot += Number(a.age));

    const prom = (tot / persons.length).toFixed(0);

    return prom;
  }

  handleDeviation() {
    let dist = 0;
    let deviation;
    const prom = this.handleAgeProm();

    const persons = this.state.persons;
    persons.map(a => dist += Math.pow((Number(a.age) - prom), 2));

    deviation = Math.sqrt(dist / persons.length).toFixed(2);

    return deviation;
  }

  componentWillMount() {
    const db = firebase.database().ref('persons');
    db.on('value', (snapshot) => {
      const persons = snapshot.val();
      const arr = [];
      for (const person in persons) {
        arr.push({
          name: persons[person].name,
          lastname: persons[person].lastname,
          age: persons[person].age,
          born: persons[person].born,
          death: persons[person].death
        })
      };

      this.setState({
        persons: arr
      });
    })
  }

  handleMoreDataClick(e) {
    e.preventDefault();
    this.setState({
      view: 'info'
    });
  }

  content() {
    if (this.state.view === 'persons') {
      return (
        <div>
          <div className='persons-list'>
            {
              this.state.persons.map((person, index) => (
                <Person
                  key={index}
                  name={person.name}
                  lastname={person.lastname}
                  age={person.age}
                  born={person.born}
                  death={person.death}
                />
              ))
            }
          </div>
          <Button text='Ver más datos' idBtn='mas-datos' href='#' handleClick={this.handleMoreDataClick} />
        </div>
      )
    } else {
      return (
        <div>
          <Data
            title='Promedio edad entre todos los clientes'
            result={this.handleAgeProm()} />
          <Data
            title='Desviación estándar entre las edades de todos los clientes'
            result={this.handleDeviation()} />
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.content()}
      </div>
    )
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      title: 'Bienvenido'
    };
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleDataClick = this.handleDataClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }

  handleRegisterClick(e) {
    e.preventDefault();
    this.setState({
      view: 'form',
      title: 'Creación de clientes'
    });
  }

  handleDataClick(e) {
    e.preventDefault();
    this.setState({
      view: 'data',
      title: 'Listado de clientes'
    });
  }

  handleHomeClick(e) {
    e.preventDefault();
    this.setState({
      view: 'home',
      title: 'Bienvenido'
    });
  }

  content() {
    if (this.state.view === 'home') {
      return (
        <div>
          <Button
            text='Regístrate'
            idBtn='registrar-cliente'
            href='#'
            handleClick={this.handleRegisterClick}
          />
          <Button
            text='Ver datos'
            idBtn='ver-datos'
            href='#'
            handleClick={this.handleDataClick}
          />
        </div>
      )
    } else if (this.state.view === 'form') {
      return <FormApp />;
    } else {
      return <ListApp />;
    }
  }

  render() {
    return (
      <div>
        <Header
          src='https://ii.ct-stc.com/3/logos/empresas/2016/12/15/supermercados-peruanos-sa-AD974EDE94913EA4thumbnail.jpeg'
          alt='Reto'
          idHd='Principal'
          text={this.state.title}
          handleClick={this.handleHomeClick}
        />
        <div className='center'>
          {this.content()}
        </div>
      </div >
    )
  }
}

ReactDOM.render(<HomeScreen />, document.getElementById('root'));
serviceWorker.unregister()
