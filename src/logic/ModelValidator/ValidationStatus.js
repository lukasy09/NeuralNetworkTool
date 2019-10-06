export const ALERT_TYPES = {
  WARNING: 'warning',
  ERROR: 'error'
};

export const ALERT_STATUS = {
    order:{
        input:{
            content: 'Wrong input layer',
            type: ALERT_TYPES.ERROR
        },
        output:{
            content: 'Wrong output layer',
            type: ALERT_TYPES.ERROR
        }
    },
    feature:{
        input:{
            activation:{
                content: 'Input layer cannot have specified activation function',
                type: ALERT_TYPES.ERROR
            }
        },
        output:{
            activation:{
                content: 'Input layer cannot have specified activation function',
                type: ALERT_TYPES.ERROR
            }
        }
    },

    count:{
        input:{
            content: 'The input layer\'s node\'s is equal to 1' ,
            type: ALERT_TYPES.WARNING
        }
    }
    
};