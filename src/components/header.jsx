class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    
    componentDidMount(){
        fetch("/js/lab3/src/data/manifest.json")
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.manifest
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    render(){
        const{error, isLoaded, items} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } 
        else if (!isLoaded) {
            return <div>Загрузка...</div>;
        }
        else{
            return(
                <div class="header" id="header">
                {items.map(item => (
                    <Header_cell key={item.id} text={`${item.surname} ${item.name} ${item.group} ${item.title}`}/>
                ))}
                </div>
            );
        }
    }
}

function Header_cell(props){
    return  <div class="header_cell" id="header_cell"> <h1>{props.text}</h1></div>;
}
