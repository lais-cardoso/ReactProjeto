import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

export default function Git(){

    const [ search, setSearch ] = useState("")
    const [ name, setName ] = useState("")
    const [ profilePicture, setProfilePicture] = useState("")
    const [ biography, setBiography ] = useState("")
    const [ localization, setLocalization ] = useState("")
    const [ repositories, setRepositories ] = useState([])
    const [ found, setFound ] = useState(false)
    let newRepositories = repositories.slice(0,5)
    let [click, setClick ] = useState(0);

    async function searchGit(){
        setClick(1);
        //para fazer requisição
        await axios.get (`https://api.github.com/users/${search}`)

        .then((body) =>{
            console.log(body.data)
            setName(body.data.name)
            setProfilePicture(body.data.avatar_url)
            setBiography(body.data.bio)
            setLocalization(body.data.location)
            setFound(true)
            
        })
        .catch((err) => {
            console.log(err)
            setName("Not found")
            setProfilePicture("")
            setBiography("Not found")
            setLocalization("Not found")
        })
    }

    useEffect(() =>{
    
        function reposGit(){
            axios.get(`https://api.github.com/users/${search}/repos`)

            .then((body) => {
                console.log(body)
                setRepositories(body.data)
            })
            .catch((err) => {
                console.log(err)
                setRepositories([])
            })
        }
    
        reposGit()
     
        
    },[name])


    return(
        <div className="body">
            
                <div className="titulo">
                    <h1>GitHub</h1>
                </div>
                
                <div className="pesquisa">
                    <input value={search} onChange={(e) => {setSearch(e.target.value) }}></input><br/>
                    <button onClick = {searchGit} className="botao">Pesquisar</button>
                </div>
           {click === 1 ? (
            <div className="caixa">

            <div className = "card">
                 <h2>Seu perfil</h2>
                 <img src={profilePicture}/>
                 <h3>Nome de usuário: {name} </h3> 
                 <h3>Biografia: {biography} </h3>
                 <h3>Localização: {localization}</h3>
             </div>
             
             <div className = "lista">
                 <h2>Repositórios</h2>
                     {newRepositories.map((element) => ( 
                         <ul key={element.id}>
                             <li>Nome: {element.name}</li>
                             <li>Descrição: {element.description}</li>
                         </ul>
                     ))}
             </div>
 
            </div>
           ): null}

            
        </div>
    )
        
}