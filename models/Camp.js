const mongoose=require('mongoose')
const campSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    name:{
        type:String,
        required:true
    },
    location:{
        type:Object,
        require:true
    },
    state:{
        type:String,
        required:true
    },
    campType:{
        type:String,
        required:[true,"Required Camp Type"],
        validate:{
            validator:function(val)
            {
                const type=['Militrary Resource Camp','Militrary Camp']
                for(var i of type)
                {
                    if(i==val)  return true
                }
                return false
            },
            message:props=>`${props.value} is not a valid camp type`
        }
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>Date.now()
    }
})
module.exports=mongoose.model('Camp',campSchema);
