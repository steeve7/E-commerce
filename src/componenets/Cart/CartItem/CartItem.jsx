import React from 'react';
import { Typography, Button, Card, CardAction, CardContent, CardMedia, CardActions, } from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart}) => {
    const classes = useStyles();
    return ( 
        <Card className={ classes.root }>
            <CardMedia image={item.media.source} className={ classes.media } alt={ item.name }/>
            <CardContent className={ classes.cardContent }>
                <Typography variant="h6">{ item.name }</Typography>
                <Typography variant="h6">{ item.line_total.formatted_with_symbol }</Typography>
            </CardContent>
            <CardActions className={ classes.cardActions }>
                <div className={ classes.buttons}>
                    <Button type="Button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{ item.quantity }</Typography>
                    <Button type="Button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                     <Button variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
                </div>
               
            </CardActions>
        </Card>
     );
}
 
export default CartItem;