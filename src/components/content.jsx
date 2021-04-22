class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            cRange: 5,
            sRange: 0,
            eRange: 5
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        this.setState({
            eRange: (this.state.eRange+this.state.cRange)
        });
        let jsonData = {
            startRange: this.state.sRange,
            endRange: this.state.eRange
        };
        fetch("/js/lab3/src/ajax/load.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
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
    
    componentDidMount(){
        this.setState({
            eRange: (this.state.eRange+this.state.cRange)
        });
        let jsonData = {
            startRange: this.state.sRange,
            endRange: this.state.eRange
        };
        fetch("/js/lab3/src/ajax/load.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(
            (result) => {
                //console.log(result);
                this.setState({
                    isLoaded: true,
                    items: result
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
                <div>
                <div className="content" id="content">
                {items.map(item => (
                    <Content_data key={item.id} id={item.id} title={item.title} picture={item.picture} news={item.news}/>
                ))}
                </div>
                <div className="content_button" id="content_button">
                <button onClick={this.handleClick}>Загрузить еще</button>
                </div>
                </div>
            );
        }
    }
}

function Content_data(props){
    return <div className="content_data"><Content_id id={props.id}/><Content_picture picture={props.picture}/><Content_title title={props.title}/><Content_news news={props.news}/></div>;
}

function Content_id(props){
    return <div className="content_id"> <h1>#{props.id} </h1></div>;
}

function Content_title(props){
    return <div className="content_title"> <h1>{props.title}</h1></div>;
}

function Content_picture(props){
    return <div className="content_picture"> <img className="content_picture" src={`${props.picture}`}/></div>;
}

function Content_news(props){
    return <div className="content_news"> <p>{props.news}</p></div>;
}