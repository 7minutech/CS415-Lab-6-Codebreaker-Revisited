class PegSelector extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        let rows = []
        rows.push(<option value={-1} selected>(select a color)</option>);

        codePegs.forEach((peg) => {
            rows.push(<option value={peg["name"]}>{peg["color"] + " (" + peg["name"] + ")"}</option>)
        })
        return(
            <td><select name="" id="">{rows}</select></td>
        )
    }
}