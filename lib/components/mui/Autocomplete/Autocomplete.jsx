import {
  default as MuiAutocomplete,
  createFilterOptions,
} from "@mui/material/Autocomplete";

function Autocomplete(props) {
  const filter = createFilterOptions();

  const filterOptions = (pOptions, pParams) => {
    const filtered = filter(pOptions, pParams);

    // Sugere a criacão de um novo valor
    if (pParams.inputValue !== "") {
      filtered.push({
        inputValue: pParams.inputValue,
        label: `Add "${pParams.inputValue}"`,
      });
    }

    return filtered;
  };

  return <MuiAutocomplete {...props} filterOptions={filterOptions} />;
}

Autocomplete.display = "Autocomplete";

export default Autocomplete;
