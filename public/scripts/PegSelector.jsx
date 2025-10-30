import { codeLength, codePegs } from './Mastermind';

class PegSelector extends React.Component {
    constructor(props){
        super(props);

        this.buildPegSelectors();
    }

    buildPegSelectors () {
        for (let i = 0; i < codeLength; ++i) {

            var pegSelectColumn = document.createElement("td");

            var pegSelect = document.createElement("select");
            $(pegSelect).attr({id: "slot" + i, class: "guess"});

            $(pegSelect).append($("<option>", {
                value: -1,
                selected: "selected",
                text: "(select a color)"
            }));

            codePegs.forEach((peg) => {
                $(pegSelect).append($("<option>", {
                    value: peg["name"],
                    text: peg["color"] + " (" + peg["name"] + ")"
                }));
            });
            
            $(pegSelectColumn).append(pegSelect);
            $("#pegslots").append(pegSelectColumn);

        }

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