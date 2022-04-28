import React, { useEffect, useRef } from 'react'

import Neovis from 'neovis.js';

const NeoGraph = ({containerId, width, height, backgroundColor, searchBool, searchVar, setSearchBool}) => {
    const visRef = useRef();

    useEffect(() => {
        const config = {
          container_id: visRef.current.id,
          server_url: "bolt://localhost:7687",
          server_user: "neo4j",
          server_password: "1010",
          nodes: {
            shape: "box",
            //size: 10,
          },
          visConfig: {
            nodes: {
              shape: "box",
              //size: 10,
            },
            edges: {
              arrows: {
                to: { enabled: true }
             }
            },
            layout: {
              hierarchical: {
                enabled: true,
                direction: "UD",
                sortMethod: "directed",
              }
            },
          },

          labels: {
            Actor: {
              caption: "name",
              size: "pagerank",
              community: "community",
              node:{shape:"box"},
            },
            Person:{
                node:{shape:"box"},
                caption: "name",
                size: "pagerank",
                community: "community",
            },
            Movie:{
                caption:"title"
            }
          },
          relationships: {
            ACTED_IN: {
              caption: true,
              arrows:true,
              thickness:"weight"
            },
          },
          initial_cypher:"MATCH p=()-[r:ACTED_IN]->() RETURN p LIMIT 25", 
        };
        const vis = new Neovis(config);
        vis.render();
      }, []);

      useEffect(() => {
        const config = {
          container_id: visRef.current.id,
          server_url: "bolt://localhost:7687",
          server_user: "neo4j",
          server_password: "1010",
          nodes: {
            shape: "box",
            //size: 10,
          },
          visConfig: {
            nodes: {
              shape: "box",
              //size: 10,
            },
            edges: {
              arrows: {
                to: { enabled: true }
             }
            },
            layout: {
              hierarchical: {
                enabled: true,
                direction: "UD",
                sortMethod: "directed",
              }
            },
          },

          labels: {
            Actor: {
              caption: "name",
              size: "pagerank",
              community: "community",
              node:{shape:"box"},
            },
            Person:{
                node:{shape:"box"},
                caption: "name",
                size: "pagerank",
                community: "community",
            },
            Movie:{
                caption:"title"
            }
          },
          relationships: {
            ACTED_IN: {
              caption: true,
              arrows:true,
              thickness:"weight"
            },
          },
          initial_cypher:""+ searchVar+ "", 
        };
        if(searchBool)
        {const vis = new Neovis(config);
        vis.render();
        setSearchBool(false)}
      }, [searchBool]);

      


  return (
        <div
        id={containerId}
        ref={visRef}
        style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: `${backgroundColor}`,
        }}
        />
  )
}

export default NeoGraph