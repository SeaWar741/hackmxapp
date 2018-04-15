import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { Button, ListItem, Radio, Right} from 'native-base';

import {MaterialIcons} from '@expo/vector-icons';

export class QuestionScreen extends React.Component {

  renderOptions(){
    return this.props.options.map((l,i)=>{
      return(
        <ListItem key={i}
          onPress={()=>{
            //alert('qwserty');
            Questions.CategoriesArray.push(l.cat);
            this.props.onAnswer.bind(this);
          }}
        >
          <Text>{l.op}</Text>
        </ListItem>
      )
    });
  }
  renderConditional(){
    if(this.props.multipleOption == false){
      return(<TextInput
        placeholder="Escribe tu respuesta"
        style={styles.answerInput}
        onEndEditing={this.props.onAnswer}
        onChangeText={this.props.onChangeText}
        keyboardType={this.props.keyboardType}
      ></TextInput>);
    } else {
      return(
        <View style={{width: '100%', backgroundColor: 'white', borderRadius: 16}}>
          {this.renderOptions()}
        </View>
      );
    }
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.questionTitle}>{this.props.question}</Text>
        {this.renderConditional()}
        <View style={{width: '100%', position: 'absolute', bottom: 32}} >
          <Button rounded style={{width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}
            onPress={this.props.onAnswer}
          >
            <Text style={{fontSize: 16, fontWeight: '800', color: '#ec0000', textAlign: 'center'}}>SIGUIENTE</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default class Questions extends React.Component {




  state={
    question: '¿Cuál es tu nombre?',
    multipleOption: false,
    currentAnswer: '',
  }

  static CategoriesArray = [];

  static questionsArray = [
    {
      question: '¿Cuál es tu nombre?',
      multipleOption: false,
    },
    {
      question: '¿Cuál es tu edad?',
      multipleOption: false,
    },
    {
      question: '¿Cuál es el producto que más cargas a tu tarjeta de crédito?',
      multipleOption: true,
      options: [
        {op:'Despensa', cat: ['']}, {op: 'Boletos de avión', cat: ['viaje']}, {op: 'Cargos relacionados con oficina/Trabajo', cat: ['negocios']}, {op: 'Ropa', cat: ['lujo']}, {op: 'Universidad', cat: ['estudiante']}, {op: 'Restaurantes', cat: ['familiar', '']}, {op: 'Electrónicos', cat: ['lujo', 'negocios']}, {op: 'Juguetes', cat: ['familiar']}
      ]
    },
    {
      question: '¿Cuál es la razón principal por la que quieres adquirir una tarjeta de crédito?',
      multipleOption: true,
      options: [
        {op: 'Pagar a los largos plazos', cat: ['ahorro', 'estudiante']}, {op: 'Para no cargar con efectivo', cat: ['', 'negocios']}, {op: 'Adquirir productos en línea', cat: ['lujo']}, {op: 'Es necesario tener una tarjeta de crédito hoy en día', cat: ['']}
      ]
    },
    {
      question: '¿Qué haces más seguido?',
      multipleOption: true,
      options: [
        {op: 'Viajar', cat: ['viaje']}, {op: 'Estudiar', cat: ['estudiante']}, {op: 'Trabajar', cat: ['negocios', '']}, {op: 'Actividades Familiares', cat: ['familiar']}
      ]
    },
    {
      question: 'Si te describieras en una palabra, ¿cuál sería?',
      multipleOption: true,
      options: [
        {op: 'Trabajador(a)', cat: ['negocios', '']}, {op: 'Responsable', cat: ['ahorro', '', 'familiar']}, {op: 'Espontáneo', cat: ['lujo', 'viajes']}, {op: 'Divertido', cat: ['lujo', 'familiar', 'viajes']}, {op: 'Tranquilo', cat: ['familiar', 'basico']}
      ]
    },
    {
      question: 'De los siguientes ¿Quién es tu modelo a seguir?',
      multipleOption: true,
      options: [
        {op:'Elon Musk', cat: ['negocios']}, {op:'Coco Chanel', cat:['lujo', 'negocios']}, {op:'Marie Curie', cat:['familiar']}, {op:'Gandhi', cat: ['']}, {op:'Mi pareja/Un familiar', cat:['familiar'] }, {op: 'Un profesor', cat: ['estudiante']}
      ]
    },
    /*{
      question: '¿Qué sería más probable que adquiririas?',
      multipleOption: true,
      options: [
        'Starbucks', 'Bolsa Hermes', 'Rolex', 'Libros', 'Pañales/Cosas de bebé', 'Mont Blanc', 'Boleto de avión', 'Comida'
      ]
    }*/
  ]
  static questionsCurrentIndex = 0;

  sort(arr){
    var a = [], b = [], prev;
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    return [a, b];
  }



  renderNextQuestion(){
    if(Questions.questionsCurrentIndex<6){
      Questions.questionsCurrentIndex++;
      this.setState({ question: Questions.questionsArray[Questions.questionsCurrentIndex].question });
      this.setState({ multipleOption: Questions.questionsArray[Questions.questionsCurrentIndex].multipleOption });
      this.setState({ options: Questions.questionsArray[Questions.questionsCurrentIndex].options });
    }
    else{
      alert( [this.sort(Questions.CategoriesArray)[0][0], this.sort(Questions.CategoriesArray)[0][1]] );
    }
    //alert(this.state.currentAnswer);

  }

  componentWillMount(){
    /*const config = {
      apiKey: "AIzaSyBMGVNkXH2DEjTSg64-Mq0HfwrfA207LOI",
      authDomain: "santander-cards.firebaseapp.com",
      databaseURL: "https://santander-cards.firebaseio.com",
      projectId: "santander-cards",
      storageBucket: "santander-cards.appspot.com",
      messagingSenderId: "439010120468"
    };
    firebase.initializeApp(config);*/
  }

  render() {
    //alert(this.sort(Questions.CategoriesArray));
    return (
      <QuestionScreen
        question={this.state.question}
        multipleOption={this.state.multipleOption}
        options={this.state.options}
        onChangeText={(answer)=>{ this.setState({currentAnswer: answer}) }}
        onAnswer={(answer)=>{
          this.renderNextQuestion(answer);
        }}
      ></QuestionScreen>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ec0000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: '100%'
  },
  questionTitle: {
    fontWeight: '800',
    fontSize: 32,
    margin: 8,
    color: 'white'
  },
  answerInput: {
    fontSize: 24,
    margin: 8,
    color: 'rgb(240,240,240)',
    width: '100%',
    borderBottomWidth: 0,
    textAlign: 'center',
  }
});
