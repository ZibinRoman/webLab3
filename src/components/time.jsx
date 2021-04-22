class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
    
    render() {
        return (
            <div className="cell">
            <h1>Текущее время: {this.state.date.toLocaleTimeString()}.</h1>
            </div>
        );
    }
}