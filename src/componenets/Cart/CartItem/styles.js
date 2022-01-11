import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(()=>({
    root:{
        maxWidth:'80%',
        justifyContent:'center',
    },
    media:{
        height:150,
    },
    cardContent:{
        display:'flex',
        justifyContent:'space-between',
    },
    cardActions:{
        justifyContent:'space-between',
    },
    buttons:{
        display:'flex',
        alignItems:'center',
    },
}));