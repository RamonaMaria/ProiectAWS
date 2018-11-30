import React, { Component } from 'react';
import './App.css';
import {getMedicaments, getAllergies} from "./data/DataUtils";
import Select from 'react-select';


class App extends Component {

   constructor(props) {
        super(props);
        this.state = {
            medicamentIsChecked: false,
            allergyIsChecked: false,
            list: [], // o sa am o lista pt medicamente si una pt alergii (pt select si afisat)
            selectedValue: '',
            placeholderSelect: 'Selevt allergy / medicament',
            numberElem: 0,
            roButton: false,
            enButton: false


        };

        this.handleMedicamentChange = this.handleMedicamentChange.bind(this);
        this.handleAllergyChange = this.handleAllergyChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleNumberElemChange = this.handleNumberElemChange.bind(this);
        this.handleEnButtonChange = this.handleEnButtonChange.bind(this);
        this.handleRoButtonChange = this.handleRoButtonChange.bind(this);
   }



   handleMedicamentChange (event) {
       console.log("Medicament", event.target.value);
       this.setState({medicamentIsChecked: event.target.value,
                           allergyIsChecked: false,
                           list: getAllergies(),
                           selectedValue: '',
                           placeholderSelect: 'Select allergy'});
        // TODO  post request de unde aduci lista de alergii -
        // ai o lista generala pe care o updatezi fie cu medicamente fie cu alergii - ce sa se puna in select
   }



   handleAllergyChange (event) {
       console.log("Allergy", event.target.value);
       this.setState({allergyIsChecked: event.target.value,
                     medicamentIsChecked: false,
                     list: getMedicaments(),
                     selectedValue: '',
                     placeholderSelect: 'Select medicament'});
        // TODO post request de unde aduci lista de medicamnete - ce sa se puna in select
   }


    handleSelectChange (value) {
       console.log("select::::: ", value);
       this.setState({selectedValue : value});

       // TODO post request unde trimiti la server medicamentul sau alergia selectat / selectata - ce sa se afiseze

    }

    handleNumberElemChange (event) {
        console.log("numberElem::::: ", event.target.value);
        this.setState({numberElem : event.target.value});
    }

    handleRoButtonChange(event) {
        console.log("roButton::::: ", event.target.value);
        this.setState({roButton : event.target.value,
                       enButton: false});
    }

    handleEnButtonChange (event) {
        console.log("enButton::::: ", event.target.value);
        this.setState({enButton : event.target.value,
                       roButton: false});
    }

    render() {
        var listItems;
        const size = this.state.numberElem;
        if(size > this.state.list.length){
            listItems = "Ne pare rau, nu sunt atatea elemente in baza de date. Va rugam introduceti un numar mai mic :) "
        } else {
            if (this.state.medicamentIsChecked && this.state.selectedValue !== '') {
                   listItems = this.state.list.slice(0, size).map((number) => // o sa fie lista de alergii
                                                   <li key={number.toString()}>
                                                       {number}
                                                   </li>);
            }

            if (this.state.allergyIsChecked && this.state.selectedValue !== '') {
                    listItems = this.state.list.slice(0, size).map((number) =>
                                                   <li key={number.toString()}>
                                                        {number}
                                                    </li>
                                                    );
            }
        }

    return (
      <div className="container">
       <span>
                 &nbsp;

          <div style={{  float: 'right'}}>
                <button type="button" className="btn btn-info"  value={true}  onClick={this.handleRoButtonChange}>Ro</button>
                {"   "}
                <button type="button" className="btn btn-info"  value={true} onClick={this.handleEnButtonChange}>En</button>
          </div>
          <center><h1>Medicaments & Allergies</h1></center>

          &nbsp;
         <div  className="radio radio-info" style={{left: '25px'}}>
            <input type="radio" name="survey" id="Radios1"  value={true} onChange={this.handleMedicamentChange}/>
            <label>
              Medicament
            </label>
         </div>
         <div className="radio radio-info " style={{left: '25px'}}>
              <input type="radio" name="survey" id="Radios2"  value={true} onChange={this.handleAllergyChange}  />
            <label>
              Allergy
            </label>
         </div>
         <Select
              onChange={this.handleSelectChange}
              options={this.state.list.map(sensor => ({label: sensor}))}
              placeholder={this.state.placeholderSelect}
              value={this.state.selectedValue}
         />
         &nbsp;
         <input type="number" className="form-control"   placeholder="Nr. elemente" onChange={this.handleNumberElemChange}/>
         &nbsp;
         {<ol> {listItems}</ol>}
        </span>

      </div>
    );
    }
}

export default App;
