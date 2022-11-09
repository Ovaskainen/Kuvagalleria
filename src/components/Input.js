import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


const Input = (props) => {
  return (
    <form onSubmit={props.submit} style={{ margin: '2rem 0'}}>
        
        <TextField 
            onChange={props.change}
            fullWidth 
            variant="standard"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
        />
    </form>
  )
};

export default Input;
