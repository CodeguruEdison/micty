import React,{ FC,useState, ChangeEvent, SyntheticEvent } from 'react'
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/FormField';
import { validate } from '../../ui/misc';
export interface IEnrollData   {
    formData :IFormData
   
}
export interface IFormData {
    email:IEnrollElement
}
export interface IElementConfig {
        name:string,
        type:string,
        placeholder:string
}
export interface IValidationRule {
    isRequired:boolean;
    isEmail:boolean;
}
export interface IEnrollElement {
    element:string,
    value:string,   
    config:IElementConfig,
    validation:IValidationRule,
    isValid:boolean,
    validationMessage:string;
}
export interface IEnrollState extends IEnrollData {
    isError:boolean,
    success:string,

}
export interface IUpdateForm {
    event:React.ChangeEvent<HTMLElement>,
    id: keyof IFormData
}
export const Enroll:FC = () => {
    const initialState:IEnrollState = {
        isError:false,
        success:'',
        formData:{
            email: {
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email'
                    ,placeholder:'Enter your email'
                },
                validation:{
                    isRequired:true,
                    isEmail: true,
                },
                isValid:false,
                validationMessage:''
            }
        }
    };
    const [enrollState,setEnrollState] = useState<IEnrollState>(initialState);
    const {formData}= enrollState;
    const submitForm =(e:HTMLFormElement)=>{
       
    }
    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) =>{

    }
    const updateForm = (element:IUpdateForm) => {
       // console.log(element);
        const newFormData = {...formData};
       // console.log(newFormData[element.id]);
       // const newElement = {...newFormData[Object.keys[newFormData][element.id]}
       // const id:any = element.id;
        //console.log(element.id);
      //  console.log(newFormData[id]);
        if(element.event.target instanceof HTMLInputElement){
           const currentTarget = element.event.target as HTMLInputElement;
           const newElement = {...newFormData[element.id]} ;
           newElement.value=element.event.target.value;

           let validData = validate(newElement);
            newElement.isValid=validData[0].isValid;
            newElement.validationMessage=validData[0].message;
         

           newFormData[element.id] = newElement;
           console.log(newFormData);


           setEnrollState(
               {...enrollState,
                  formData:newFormData
               });
        

            console.log(currentTarget.value);
        }
       //console.log(typeof(event.target));
       //const htmlElement = event.type
       //console.log(event.target.value);
    }
    return (
        <Fade>
            <div className="enroll_wrapper">
                <form onSubmit={(e)=> submitForm}>
                    <div className="enroll_title">
                        Enter you Email
                    </div>
                    <div className="enroll_input">
                        <FormField
                            id={'email'}
                            formData={formData.email}
                            change = {({event,id})=>updateForm({event,id})}
                        >

                        </FormField>
                        <button onClick={()=>handleSubmit} >Enroll</button>
                    </div>
                </form>
            </div>
        </Fade>
    )
}
export default Enroll;
