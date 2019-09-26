import React from 'react';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';


export default function RestCard(){
    return(
        <Card>
            <CardActionArea>
               <CardMedia/>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Order
                </Button>
            </CardActions>
        </Card>
    );
}