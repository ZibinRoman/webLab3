class Orderform extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            name: '',
            mail: '',
            text: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        fetch("/js/lab3/src/data/order.json?=e2")
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.order
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
    
    handleChange = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })    
    }
    
    handleSubmit(event){
        event.preventDefault();
        const {name, mail, text} = this.state;
        let bname = false;
        let bmail = false;
        let btext = false;
        if(name.length>=4&&name.length<=16){bname = true;}else{bname = false;}
        if(mail.length>=4&&mail.length<=64){bmail = true;}else{bmail = false;}
        if(text.length>=4&&text.length<=256){btext = true;}else{btext = false;}
        if(bname&&bmail&&btext==true){
            let jsonData = {
                name: name,
                mail: mail,
                text: text
            };
            fetch("/js/lab3/src/ajax/saveOrder.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }, 
                body: JSON.stringify(jsonData)
            })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            alert("Отзыв записан! Нажмите обновить страницу и или загрузить еще");
        } else{
            alert("Введите корректные значения!");
        }
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
                <div className="order" id="order">
                <form autocomplete="off" onSubmit={this.handleSubmit}>
                {items.map(item => (
                    <div className="order_data" id="order_data" key={item.id}>
                    <Order_name ename={item.name} name_desc={item.name_desc} name={this.state.name} handleChange={this.handleChange}/>
                    <Order_mail ename={item.mail} name_desc={item.mail_desc} name={this.state.mail} handleChange={this.handleChange}/>
                    <Order_text ename={item.text} name_desc={item.text_desc} name={this.state.text} handleChange={this.handleChange}/>
                    </div>
                ))}
                <button onClick={this.handleSubmit}>
                Отправить
                </button>
                </form>
                </div>
            );
        }
    }
}

class Order_name extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };
    }
    
    render(){
        const name = this.state.name;
        return(
            <div class="order_name" id="order_name">
            <fieldset className="fieldset_order"><legend>{this.props.ename}</legend>
            <input 
                type="text"
                name="name"
                value={this.props.name}
                required
                pattern="[A-Za-z]{4,16}"
                placeholder={this.props.name_desc}
                minlength="4"
                maxlength="16"
                className="text_order"
                onChange={this.props.handleChange}
            />
            <span class="validity"></span>
            </fieldset>
            </div>
        );
    }
}

class Order_mail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };
    }
    
    render(){
        const mail = this.state.mail;
        return(
            <div className="order_mail" id="order_mail">
            <fieldset className="fieldset_order"><legend>{this.props.ename}</legend>
            <input 
                type="email"
                name="mail"
                value={this.props.mail} 
                required 
                placeholder={this.props.name_desc}
                className="text_order"
                onChange={this.props.handleChange}
            />
            <span class="validity"></span>
            </fieldset>
            </div>
        );
    }
}

class Order_text extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };
    }
    
    render(){
        const text = this.state.text;
        return(
            <div className="order_text" id="order_text">
            <fieldset className="fieldset_order"><legend>{this.props.ename}</legend>
            <textarea
                name="text"
                value={this.props.text}
                required
                placeholder={this.props.name_desc}
                rows="4"
                minlength="10"
                maxlength="255"
                className="textarea_order"
                onChange={this.props.handleChange}
            >
            </textarea>
            <span class="validity"></span>
            </fieldset>
            </div>
        );
    }
}

class Ordercontent extends React.Component{
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
        fetch("/js/lab3/src/ajax/loadOrder.php", {
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
        fetch("/js/lab3/src/ajax/loadOrder.php", {
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
                <div className="order" id="order">
                {items.map(item => (
                    <Content_data key={item.id} id={item.id} name={item.name} mail={item.mail} text={item.text}/>
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
    return <div className="content_data"><fieldset className="fieldset_order"><legend>Отзыв №{props.id}</legend><Content_name name={props.name}/><Content_mail mail={props.mail}/><Content_text text={props.text}/></fieldset></div>;
}

function Content_name(props){
    return <div className="content_name"><h1>{props.name}</h1></div>;
}

function Content_mail(props){
    return <div className="content_mail"> <p>{props.mail}</p></div>;
}

function Content_text(props){
    return <div className="content_text"> <p>{props.text}</p></div>;
}