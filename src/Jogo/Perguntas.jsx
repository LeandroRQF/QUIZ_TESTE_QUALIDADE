import React, { Component } from 'react';
import { Grid, Radio, Button, Message, Icon, Progress } from 'semantic-ui-react';
import axios from 'axios';

import Navegacao from './Navegacao';

class Perguntas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            perguntas: {},
            estaCarregando: false,
            perguntaAtual: 0,
            totalPerguntas: 0
        }
    }

    componentDidMount() {
        this.carregaPerguntas(this.props.match.params.nome)
    }

    carregaPerguntas(cat) {
        console.log('categoria de pergunta:', cat)

        this.setState({
            estaCarregando: true,
            perguntas: {}
        })

        const url = `https://quiz-cartsys.firebaseio.com/categorias.json?orderBy="nome"&equalTo="${cat}"`

        axios
            .get(url)
            .then(dados => {
                const chave = Object.keys(dados.data)[0]
                console.log("Lista de perguntas", dados.data[chave])
                this.setState({
                    estaCarregando: false,
                    perguntas: dados.data[chave]
                })
            })
            .catch(err => {
                console.log('Algum problema ocorreu')
            })
    }

    renderPergunta(pergunta, id) {
        return (
            <span key={id}>
                <h3>PERGUNTA: {pergunta.titulo}</h3>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Message color='yellow'>
                                <h1>{pergunta.alternativas}<Radio toggle /></h1>
                                <p>Select * from TABELA</p>
                            </Message>
                        </Grid.Column>
                        <Grid.Column>
                            <Message color='teal'>
                                <h1>Alternativa 2 <Radio toggle /></h1>
                                <p>Select TABELA.* from TABELA</p>
                            </Message>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Message color='pink'>
                                <h1>Alternativa 3 <Radio toggle /></h1>
                                <p>Select t.* from TABELA t</p>
                            </Message>
                        </Grid.Column>
                        <Grid.Column>
                            <Message color='brown'>
                                <h1>Alternativa 4 <Radio toggle /></h1>
                                <p>Select TABELA from TABELA</p>
                            </Message>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </span>
        )
    }

    render() {

        if (this.state.estaCarregando) {
            return <p>Carregando...</p>
        }

        return (
            <div>
                <Navegacao />

                <h2> <Icon name={this.state.perguntas.icone} /> {this.props.match.params.nome} </h2>

                <p>Mostre que você conhece tudo sobre este assunto</p>

                {
                    this.state.perguntas.perguntas && Object.keys(this.state.perguntas.perguntas)
                    .map(key => {
                        return this.renderPergunta(this.state.perguntas.perguntas[key], key)
                    })
                }

                <Button>Finalizar</Button>
            </div>
        )
    }
}

export default Perguntas;