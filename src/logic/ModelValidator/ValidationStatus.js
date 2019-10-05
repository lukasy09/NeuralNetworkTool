export const STATUS_TYPES = {
  WARNING: 'warning',
  ERROR: 'error'
};

export const STATUS = {
    order:{
        input:{
            content: 'Wrong input layer',
            type: STATUS_TYPES.ERROR
        },
        output:{
            content: 'Wrong output layer',
            type: STATUS_TYPES.ERROR
        }
    },
    feature:{
        input:{
            activation:{
                content: 'Input layer cannot have specified activation function',
                type: STATUS_TYPES.ERROR
            }
        },
        output:{
            activation:{
                content: 'Input layer cannot have specified activation function',
                type: STATUS_TYPES.ERROR
            }
        }
    },

    count:{
        input:{
            content: 'The input layer\'s count is very small',
            type: STATUS_TYPES.WARNING
        }
    }
    
};