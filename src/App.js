import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import Graph from 'vis-react';


const query= gql `
  query Query {
    departamentos {
      codigo_departamento
      nombre
      municipios {
        nombre
        latitud
        longitud
      }
    }
  }
`

var graph = {
  nodes: [
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' }
  ],
  edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
  ]
};

var options = {
  layout: {
      hierarchical: true
  },
  edges: {
      color: '#000000'
  },
  interaction: { hoverEdges: true }
};

function App() {
  const result= useQuery(query)

  console.log(result)


  function renderGraph(){

    var newNodos=[]
    var newEdges=[]

    for (let index = 0; index < result.data.departamentos.length; index++) {
      var nodo = {id:"d"+ result.data.departamentos[index].codigo_departamento, label: result.data.departamentos[index].nombre }
      newNodos.push(nodo)
        for (let index2 = 0; index2 < result.data.departamentos[index].municipios.length; index2++) {
          var nodo2 = {id:"m"+ result.data.departamentos[index].codigo_departamento+"m"+(index2+1), label: result.data.departamentos[index].municipios[index2].nombre }
          newNodos.push(nodo2)
          var edge1={from:"d"+ result.data.departamentos[index].codigo_departamento, to:"m"+ result.data.departamentos[index].codigo_departamento+"m"+(index2+1)}
          newEdges.push(edge1)
        }
    }
    console.log("nodos", newNodos)
    return <Graph
          graph={{nodes:newNodos, edges:newEdges}}
          options={options}
          />
  }

  return (
    <div className="App">
      <header className="App-header">
        
        {result.data &&
        <p>
          {renderGraph()}
          {result.data.departamentos.map((data, index)=>{

            var newNodes=[]

            

            return <p key={index}>{data.nombre}</p>
          })}
        </p>}


        <Graph
        graph={graph}
        options={options}
        />,

      </header>
    </div>
  );
}

export default App;
