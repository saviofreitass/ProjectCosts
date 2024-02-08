import { useLocation } from "react-router-dom"

import {useState, useEffect} from 'react'

import Message from "../layout/Message"
import LinkButton from "../layout/LinkButton"
import Loading from "../layout/Loading"
import Container from "../layout/Container"
import ProjectCard from "../project/ProjectCard"

import styles from './Projects.module.css'


function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(
            () => {
                fetch("http://localhost:5000/projects",{
                    method:"GET",
                    headers:{
                        'Content-Type' : "application/json",
                    },
                })
                .then((resp) => resp.json())
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
            }, 1000)
     }, [])

     function removeProject(id){

        fetch(`http://localhost:5000/projects/${id}`,{
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage("Projeto removido!")
        })
        .catch(err => console.log(err))
     }
    

    return(
        <div className={styles.project_container}>
            <div className={styles.tittle_container}>
            <h1>Meus projetos</h1>
            <LinkButton to="/newproject" text="Criar novo projeto" /> 
            </div>
            {message && <Message type="success" msg={message}/>}
            {projectMessage && <Message type="success" msg={projectMessage}/>}
            <Container customClass="start">
                {projects.length > 0 &&
                projects.map((project) => 
                    <ProjectCard 
                    id={project.id}
                    name={project.name} 
                    budget={project.budget} 
                    category={project.category.name}
                    key={project.id}
                    handleRemove={removeProject}/>
                )}
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&(
                    <p>Nao há projetos salvos!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects