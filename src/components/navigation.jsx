class Nav extends React.Component{
    render(){
        return <div className='navigation'>
            <ul className="navigation_menu">
                <li><a href="/index.html">Домой</a></li>
                <li><a href="/donate/">Поддержать</a></li>
                <li><a href="/contact/">Контакт</a></li>
                <li><a href="order.html">Оставить отзыв</a></li>
            </ul>
        </div>
    }
}

ReactDOM.render(
    <Nav />,
    document.getElementById("navigation_header")
)