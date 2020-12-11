import React from 'react';
import Autosuggest from 'react-autosuggest';
import { StandardEditorProps } from '@grafana/data';
import './TypeaheadTextfield.css'

import { PanelSettings } from '../../types';

interface Props extends StandardEditorProps<string, PanelSettings> {}

export class TypeaheadTextField extends React.PureComponent<Props> {
    constructor(props: Props | Readonly<Props>) {
        super(props);
        this.state = {...props};
      }

    renderSuggestion(suggestion:any){
        return(
        <div>
          {suggestion}
        </div>)
    }

    getColumns() {
        return["aaaa", "aa", "cccc"]
    }

    onChange = (event: any, { newValue, method }: any) => {
        this.setState({
            value: event.currentTarget.value
        })
        this.props.onChange.call(this.props.item.path, newValue)
    }

    getSuggestions = (value: any) => {
        var inputValue = "";
        if(value !== undefined) {
            inputValue = value.trim().toLowerCase();
        }
        const inputLength = inputValue.length;
        console.log(this.getColumns().filter((column =>
            column.toLowerCase().slice(0, inputLength) === inputValue
        )))
        return inputLength === 0 ? [] : this.getColumns().filter((column =>
            column.toLowerCase().slice(0, inputLength) === inputValue
        ));
      };


    onSuggestionsFetchRequested = (value: any)=>{
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    getSuggestionValue = (suggestion: any) => {
        return suggestion
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        var value = this.props.value
        if(value === undefined) {
            value = ""
        }
        
        const suggestions =  this.getSuggestions(value)

        const inputProps = {
            placeholder: 'Enter cloumn name...',
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                theme={ {input: "input-small gf-form-input width-100"} }
            />
        );
    }
}