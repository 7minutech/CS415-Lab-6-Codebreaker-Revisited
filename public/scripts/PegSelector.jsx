class PegSelector extends React.Component {
    constructor(props){
        super(props);
        this.state = {selected: -1};
    }

    pegSelected = (event) => {
        this.setState({selected: event.target.value})
        this.props.onChange(this.props.slot, event.target.value)
    }

    render() {
        let rows = []
        rows.push(<option value={-1} selected>(select a color)</option>);

        codePegs.forEach((peg) => {
            rows.push(<option value={peg["name"]}>{peg["color"] + " (" + peg["name"] + ")"}</option>)
        })
        return(
            <td><select name="" id="" onChange={this.pegSelected}>{rows}</select></td>
        )
    }
}