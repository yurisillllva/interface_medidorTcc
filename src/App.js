import { useState, useEffect } from 'react';
import './style.css';
import firebase from './firebaseConnection';

function App() {
  const [idMedicao, setIdMedicao] = useState('');
  const [corrente, setCorrente] = useState('');
  const [energia, setEnergia] = useState('');
  const [fp, setFP] = useState('');
  const [pagar, setPagar] = useState('');
  const [potencia, setPotencia] = useState('');
  const [tempo, setTempo] = useState('');
  const [tensao, setTensao] = useState('');
  const [medicoes, setMedicoes] = useState([]);


  useEffect(()=>{
    async function loadMedicoes(){
      await firebase.firestore().collection('medicoes')
      .onSnapshot((doc)=>{
        let meusMedicoes = [];

        doc.forEach((item)=>{
          meusMedicoes.push({
            id: item.id,
            corrente: item.data().corrente,
            energia: item.data().energia,
            fp: item.data().fp,
            pagar: item.data().pagar,
            potencia: item.data().potencia,
            tempo: item.data().tempo,
            tensão: item.data().tensao,
          })
        });

        setMedicoes(meusMedicoes);

      })
    }

    loadMedicoes();

  }, []);

 
  async function handleAdd(){
    
    await firebase.firestore().collection('medicoes')
    .add({
      corrente: corrente,
      energia: energia,
      fp: fp,
      pagar: pagar,
      potencia: potencia,
      tempo: tempo,
      tensao: tensao
      
    })
    .then(()=>{
      console.log(' DADOS CADASTRADOS COM SUCESSO!');
      setCorrente('');
      setEnergia('');
      setFP('');
      setPagar('');
      setPotencia('');
      setTempo('');
      setTensao('');
     
    })
    .catch((error)=>{
      console.log('Gerou algum erro: ' + error)
    })
  }

  async function buscaMedicoes(){
   
    await firebase.firestore().collection('medicoes')
    .get()
    .then((snapshot)=>{
      let lista = [];
      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          corrente: doc.data().corrente,
            energia: doc.data().energia,
            fp: doc.data().fp,
            pagar: doc.data().pagar,
            potencia: doc.data().potencia,
            tempo: doc.data().tempo,
            tensão: doc.data().tensao
        })
      })

      setMedicoes(lista);

    })
    .catch(()=>{
      console.log('Deu erro!');
    })

  }

  async function editarMedicoes(){
    await firebase.firestore().collection('medicoes')
    .doc(idMedicao)
    .update({
      corrente: corrente,
      energia: energia,
      fp: fp,
      pagar: pagar,
      potencia: potencia,
      tempo: tempo,
      tensao: tensao
    })
    .then(()=>{
      console.log('Dados atualizados com sucesso!');
      setCorrente('');
      setEnergia('');
      setFP('');
      setPagar('');
      setPotencia('');
      setTempo('');
      setTensao('');
    })
    .catch(()=>{
      console.log('Deu erro');
    })
  }

  async function excluirMedicao(id){
    await firebase.firestore().collection('medicoes').doc(id)
    .delete()
    .then(()=>{
      alert('Essa medição foi excluida!')
    })
    .catch('Deu erro ao excluir')
  }

  return (
    <div>
      <h1>Monitoramento Inteligente em Tempo Real</h1><br/>
     
      <hr/>

    <div className="container">
    <h2>Monitoramento em Tempo Real:</h2>
    <label>ID</label>
    <input type="text" value={idMedicao} onChange={(e) => setIdMedicao(e.target.value)}/>
    
    <label>Tensão: </label>
    <textarea type="number" value={tensao} onChange={ (e) => setTensao(e.target.value)}/> 

    <label>Corrente: </label>
    <textarea type="number" value={corrente} onChange={ (e) => setCorrente(e.target.value)}/>

    <label>Potência: </label>
    <textarea type="number" value={potencia} onChange={ (e) => setPotencia(e.target.value)}/>

    <label>Energia: </label>
    <textarea type="number" value={energia} onChange={ (e) => setEnergia(e.target.value)}/>

    <label>Fator de Potência: </label>
    <textarea type="number" value={fp} onChange={ (e) => setFP(e.target.value)}/>

    <label>Tempo de medição: </label>
    <textarea type="text" value={corrente} onChange={ (e) => setTempo(e.target.value)}/>

    <label>Valor a ser pago: </label>
    <textarea type="number" value={pagar} onChange={ (e) => setPagar(e.target.value)}/>
    
    
    <button onClick={ handleAdd }>Cadastrar</button>
    <button onClick={ buscaMedicoes }>Buscar Medições</button> 
    <button onClick={ editarMedicoes }>Editar Medições</button><br/> 
    
    <ul>
      {medicoes.map((medicao)=>{
        return(
          <li key={medicao.id}>
            <span>ID: {medicao.id}</span> <br/>
            <span>Corrente: {medicao.corrente} </span> <br/>
            <span>Energia: {medicao.energia}</span> <br/>
            <span>Fator de Potencia: {medicao.fp}</span> <br/>
            <span>Valoar a ser pago: {medicao.pagar}</span> <br/>
            <span>Potência: {medicao.potencia}</span> <br/>
            <span>Tempo: {medicao.tempo}</span> <br/>
            <span>Tensão: {medicao.tensao}</span> <br/>
            <button onClick={()=> excluirMedicao(medicao.id) }>Excluir Medição</button> <br/> <br/>
          </li>
        )
      })}
    </ul>

    </div>
    </div>
  );
}

export default App;
