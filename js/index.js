const API_KEY = '//-- La APIKEY obtenida en https://newsapi.org/docs/ --//'
const obtenerNoticias = (event)=>{
    event.preventDefault();
    let topico = document.querySelector('#topico').value;
    let cantidad = document.querySelector('#numeroResultados').value;
    let url=`https://newsapi.org/v2/everything?q=${topico}&pageSize=${cantidad}`;

    let config = {
        method:"GET",
        headers :{
            Authorization : `Bearer ${API_KEY}`
        }
    };
    
    fetch(url,config)
        .then( response =>{
            if(response.ok){
                return response.json();
            }
            else{
                throw Error( response.statusText );
            }
        })
        .then( jsonResponse =>{
            let resultados = document.querySelector('.resultados');
            resultados.innerHTML="";
            for(let i=0;i<jsonResponse.articles.length;i++){
                resultados.innerHTML += `<div>
                                            <h2>
                                                ${jsonResponse.articles[i].title}
                                            </h2>
                                            <div>
                                                <img src="${jsonResponse.articles[i].urlToImage}" alt="${jsonResponse.articles[i].source.name}"
                                            </div>
                                            <h5>
                                                ${jsonResponse.articles[i].author}
                                            </h5>
                                            <p>
                                                ${jsonResponse.articles[i].description}
                                            </p>
                                         </div>  
                
                `
            }
        })
        .catch( error =>{
            console.log(error);
        });
}

let formularioNoticias = document.querySelector( '.formularioNoticias' );

formularioNoticias.addEventListener( 'submit', obtenerNoticias); //para el formulario