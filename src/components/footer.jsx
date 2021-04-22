class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    
    componentDidMount(){
        fetch("/js/lab3/src/data/footer.json?=ver1")
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data_footer
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
                <div class="footer" id="footer">
                {items.map(item => (
                    <Footer_cell key={item.id} name={item.name} value={item.value}/>
                ))}
                </div>
            );
        }
    }
}

function Footer_cell(props){
    return  <div class="footer_cell" id="footer_cell"> <h1>{props.name}</h1><p>{props.value}</p></div>;
}