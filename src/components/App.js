import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Moment from "moment";
import './index.css'



export default class App extends React.Component {

    state = {
        acessoRapido: [],
        api: []
    };
    
    
    componentDidMount(){

            
        var acessoRapido = fetch(`_api/web/lists(guid'8C424165-552E-49B2-B651-5F7109C29E2D')/Items?$select=Id,Title,URL,Ordem,ItemPrincipal/Title&$expand=ItemPrincipal`, {  
            accept: 'application/json;odata=verbose',
        })
          .then(r => r.json())
          .then(res => {
                var orderResults = res.d.results.sort((a,b) =>{
                    if(a.Ordem < b.Ordem){
                        return -1
                    }else if(a.Ordem > b.Ordem){
                        return 1;
                    }else {
                        return 0;
                    }
                });
                this.setState({
                    acessoRapido:orderResults
                });
          })
          .catch(console.log);

          // pegando a api da raiz
          var apiSP = fetch(`_api/web/`, {  
            accept: 'application/json;odata=verbose',
        })
          .then(r => r.json())
          .then(api => {
                this.setState({
                    api:api.d
                });
          })
          .catch(console.log);

          var calls = [acessoRapido, apiSP]

          return Promise.all(calls);
    }

    render(){
        return (
            <div className="nav-global">
                <Container>
                    <h1 className="mb-5">Acesso Rápido <img src={this.state.api.SiteLogoUrl} alt="" /></h1>
                    <Table striped bordered hover size="sm" variant="dark">
                        <thead>
                            <tr className="bg-primary font-weight-bold">
                                <td>#</td>
                                <td>TITLE</td>
                                <td>URL</td>
                                <td>ORDER</td>
                                <td colSpan="2">MODIFIED</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.acessoRapido.map(item => (
                                <tr key={item.Id}>
                                    <td>{item.Id}</td>
                                    <td>{item.Title}</td>
                                    <td>{item.URL}</td>
                                    <td>{item.Ordem}</td>
                                    <td>{Moment(item.Modified).format('DD/MM')}</td>
                                    <td className="text-center">
                                        <a href={item.URL} title={item.Title} target="_blank">
                                            <svg className="bi bi-eye" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 001.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0014.828 8a13.133 13.133 0 00-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 001.172 8z" clipRule="evenodd"/>
                                                <path fillRule="evenodd" d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" clipRule="evenodd"/>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export {App}