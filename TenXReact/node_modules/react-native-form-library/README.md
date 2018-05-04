## About
This directory contains the project that implements a solution for sharing common form functionality among react form components.
#### Web
If you are looking for the same functionality for react web, checkout react-form-library.
## Exports
#### Form (wrapper function)
Provides an update property to use for your form fields.
###### 'Form' Function Parameters

Table of parameters that the wrapper function takes.

| Params        | Type          | Description                                           |
| ------------- |:--------------| ------------------------------------------------------|
| component     | Component     | The component to wrap.                                |
| formKey       | String        | The object key of your form object declared in state. |

###### Provided Props

Table of props the wrapper function provides to the component.

| Props          | Type          | Description                                          |
| -------------  |:--------------| -----------------------------------------------------|
| updateProperty | Component     | Function to update form field with new value.        |

###### 'updateProperty' Function Parameters

Table of paramters that the updateProperty function takes.

| Params        | Type         | Description                                         |
| ------------- |:-------------| ----------------------------------------------------|
| key           | String       | The key of the form object to update. Allows dot notation, i.e. 'user.profile.first_name'. |
| value         | Any          | The new value to be set.                            |


##### Usage
Example.
````
import React from 'react'
import {Form} from 'react-native-form-library'
import {TextInput} from 'react-native'
class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myForm: {
        profile: {
          first_name: ''
          }
        }
      }
    }

    render (
      const {updateProperty} = this.props
      return (
        <TextInput
          name="profile.first_name"
          value={this.state.myForm.profile.first_name}
          onChange=((event) => updateProperty("profile.first_name", event.nativeEvent.text))
        />
      )
    )
}
export default Form(Class, 'myForm')
````

##### Suggested Usage
Create a class for your form components in order to easily handle the update property.
```
import React from 'react'
import {TextInput} from 'react-native'
import {Form} from 'react-native-form-library'

class InputField extends React.Component {
    onChange (event) {
        this.props.onChange(this.props.name, event.nativeEvent.text)
    }
    render (
        return (
         <TextInput
           ...this.props
           value={this.props.value}
           onChange={this.onChange.bind(this)}
         />
        )
    )
}

class Class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myForm: {
                profile: {
                    first_name: ''
                }
            }
        }
     }

     render (
       const {updateProperty} = this.props
       const {myForm} = this.state
       return (
         <InputField
           name="profile.first_name"
           value={myForm.profile.first_name}
           onChange=(updateProperty)
         />
       )
     )
 }
 export default Form(Class, 'myForm')
 ```

### ValidateForm (wrapper function)
Provides form validation on submit to your form
###### ValidateForm Function Parameters

Table of parameters the ValidateForm function takes.

| Params        | Type          | Description                                          |
| ------------- |:--------------| -----------------------------------------------------|
| component     | Component     | The component to wrap                                |


###### Provided Props

Table of props the wrapper function provides to the component.

| Props           | Type          | Description                                          |
| --------------- |:--------------| -----------------------------------------------------|
| formErrors      | Object        | The key value pair containing fields with errors.    |
| validateForm    | Func          | The function to validate the form provided.          |
| resetValidation | Func          | The function to reset the formErrors object          |

###### 'validateForm' Function Parameters

Table of paramaters the validateForm function takes.

| Params         | Type          | Description                         |
| -------------- |:--------------| ------------------------------------|
| form           | Object        | The form object.                    |
| requiredFields | Object        | The required fields to be validated |

 ###### 'requiredFields' Supported Keys

 Table of keys validateForm recongizes.

| Key            | Type          | Description                                                     |
| -------------- |:--------------| ----------------------------------------------------------------|
| type           | String        | The type of validation for the field, i.e required, email, etc. |
| message        | String        | Custom message to be returned on key value pair for formErrors. This can be useful if you want to display a custom message by rendered by your input.|
| validate       | Func          | Custom validation function.                                     |

###### 'validate' Function

Custom validate function properties.

| Attr.          | Type          | Description                                         |
| -------------- |:--------------| ----------------------------------------------------|
| param          | Any           | The value to validate against.                      |
| return         | Bool          | True/false indicator whether the validation passes. |


##### Usage
Ex.
```
import React from 'react'
import {View, Text, TouchableHighlight} from 'react-native'
import {ValidateForm} from 'react-native-form-library'

const requiredFields = {
    "profile.first_name": {
      type: 'required'
    },
    "email": {
      type: 'email',
      message: 'Provide a valid email',
    },
    "facility": {
      validate: (value) => {return value === 'myfacility'},
      message: 'The facility does not exist in our system'
    }
}

class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: {
      profile: {
        first_name: ''
      },
      email: '',
      facility: ''
    }}
  }

  onSubmit() {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      ///fires off some api call
      api.submitForm(form).then(() => {
        this.props.resetValidation();
      }).catch(() => false)
    }
  }

  render (
    const {formErrors} = this.props;
    const {form} = this.state
    return (
      <View>
        <InputField
          ...
          hasError={formErrors.profile && formErrors.profile.first_name}
          value={form.profile.first_name}
        />
        <InputField
          ...
          hasError={formErrors.last_name}
          value={form.email}
        />
        <InputField
          ...
          hasError={formErrors.last_name}
          value={form.facility}
        />
        <TouchableHighlight onPress={this.onSubmit.bind(this)}>
            <Text>Submit</Text>
        </TocuhableHighlight>
      </View>
    )
  )
}

export default ValidateForm(Class)
```

## Components
### Input
Form input field.
###### Input Props
Input props. Refer to React Native's docs for all available Props to TextInput.
| Props                 | Type            | Description                                          |
| ----------------------| :---------------| -----------------------------------------------------|
| containerStyle        | Object          | Style the input container.                            |
| containerActiveStyle  | Object          | Style the input container when input is active. Input sets the active style onFocus. Input removes the active style onBlur.|
| containerErrorStyle   | Object          | Style the input container when the error prop is set to true. |
| error                 | Boolean         | Flag indicating whether form validation failed. Sets error styles when true. |
| inputStyle            | Object          | Style the input form element.               |
| inputActiveStyle      | Object         | Style the input form element when input is active. Input sets the active styles onFocus. Input removes the active styles onBlur.|
| inputErrorStyle       | Object          | Style the input form element when the error prop is set to true. |
| label                 | String          | Label text for the form element.                     |                   
| labelStyle            | Object          | Style the label on the input form element.  |
| labelActiveStyle      | Object          | Style the label on the input form element when input is active. Input sets the active styles onFocus. Input removes the active styles onBlur.|
| inputErrorStyle       | Object          | Style the label on the input form element when the error prop is set to true. |
| name                  | String          | Name of the input form element. Should be the same as the form field key.              |
| onBlur                | Func            | Custom onBlur function.                              |
| onChange              | Func            | onChange prop provided by Form library.              |
| onFocus               | Func            | Custom onFocus function.                             |
| placeholder           | String          | Placeholder text for the form input.                 |
| value                 | String          | Value of the input field.                       |

##### Usage
Ex.
```
import React from 'react'
import {Input, Form, ValidateForm} from 'react-native-form-library'
class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        profile: {
          first_name: ''
        }
      }
    }
  }
  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <Input
        containerStyle={containerStyle}
        containerActiveStyle={containerActiveStyle}
        containerErrorClass={containerErrorStyle}
        error={formErrors.profile && formErrors.profile.first_name}
        inputStyle={inputStyle}
        inputActiveStyle={inputActiveStyle}
        inputErrorStyle={inputErrorStyle}
        label="First Name"
        labelStyle={labelStyle}
        labelActiveStyle={labelActiveStyle}
        labelErrorStyle={labelErrorStyle}
        name="profile.first_name"
        onBlur={() => console.log("onBlur")}
        onChange={updateProperty}
        onFocus={() => console.log("onFocus")}
        placeholder="First Name"
        value={form.profile.first_name}
      />
    )
  }
}

export default ValidateForm(Form(Class, 'form'))
```

### Select
Form select field.
###### Select Props
Select props.
| Props                 | Type            | Description                                          |
| ----------------------| :---------------| -----------------------------------------------------|
| name                  | String          | Name of the input form element. Should be the same as the form field key.     
| onChange              | Func            | onChange prop provided by Form library.              |
| options               | Array           | Select options. Should be an array of objects. {value, name}. If 'value' is not set, select looks for an 'id'. Else it uses 'name' as the onChange value.}
| placeholder           | String          | First select option label text. Defaults to Select...|
| value                 | String, Number, Date | Value of the input field.                       |

##### Usage
Ex.
```
import React from 'react'
import {Select, Form, ValidateForm} from 'react-native-form-library'

const options = [
  {value: 1, name: 'Value 1'},
  {value: 2, name: 'Value 2'},
  {value: 3, name: 'Value 3'}
]

class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        selectValue: ''
      }
    }
  }
  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <Select
        name="selectValue"
        onChange={updateProperty}
        options={options}
        placeholder="Choose a Value..."
        value={form.selectValue}
      />
    )
  }
}

export default ValidateForm(Form(Class, 'form'))
```

<MonthYearPickerField
                  style={styles.marginTop}
                  label='TO'
                  name='to'
                  onChange={updateProperty}
                  onFocus={onFormElementFocus}
                  placeholder='TO'
                  value={form.to}
                />
### DatePicker
Form DatePicker field.
###### DatePicker Props
DatePicker props.
| Props                 | Type            | Description                                          |
| ----------------------| :---------------| -----------------------------------------------------|
| maxYear               | Number          | Max year available.                                  |
| minYear               | Number          | Min year available.                                  |
| name                  | String          | Name of the input form element. Should be the same as the form field key. |    
| onChange              | Func            | onChange prop provided by Form library.              |
| value                 | String | Value of the input field.     YYYY-DD-MM                  |

##### Usage
Ex.
```
import React from 'react'
import {DatePicker, Form, ValidateForm} from 'react-native-form-library'

class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        date: ''
      }
    }
  }
  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <DatePicker
        name='date'
        onChange={updateProperty}
        value={form.date}
      />
    )
  }
}

export default ValidateForm(Form(Class, 'form'))
```

### MonthYearPicker
Form MonthYearPicker field.
###### MonthYearPicker Props
MonthYearPicker props.
| Props                 | Type            | Description                                          |
| ----------------------| :---------------| -----------------------------------------------------|
| maxYear               | Number          | Max year available.                                  |
| minYear               | Number          | Min year available.                                  |
| name                  | String          | Name of the input form element. Should be the same as the form field key. |    
| onChange              | Func            | onChange prop provided by Form library.              |
| value                 | String | Value of the input field.     YYYY-MM                  |

##### Usage
Ex.
```
import React from 'react'
import {MonthYearPicker, Form, ValidateForm} from 'react-native-form-library'

class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        date: ''
      }
    }
  }
  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <MonthYearPicker
        name='date'
        onChange={updateProperty}
        value={form.date}
      />
    )
  }
}

export default ValidateForm(Form(Class, 'form'))
```

### YearPicker
Form YearPicker field.
###### YearPicker Props
YearPicker props.
| Props                 | Type            | Description                                          |
| ----------------------| :---------------| -----------------------------------------------------|
| initialValue          | String          | Default starting value.                              |
| maxYear               | Number          | Max year available.                                  |
| minYear               | Number          | Min year available.                                  |
| name                  | String          | Name of the input form element. Should be the same as the form field key. |    
| onChange              | Func            | onChange prop provided by Form library.              |
| value                 | String | Value of the input field.     YYYY                 |

##### Usage
Ex.
```
import React from 'react'
import {YearPicker, Form, ValidateForm} from 'react-native-form-library'

class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        date: ''
      }
    }
  }
  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <YearPicker
        initialValue="2017"
        name='date'
        onChange={updateProperty}
        value={form.date}
      />
    )
  }
}

export default ValidateForm(Form(Class, 'form'))
```
### TimePicker
Form TimePicker field.
###### TimePicker Props
TimePicker props.
| Props                 | Type            | Description                                          |
| ----------------------| :---------------| -----------------------------------------------------|
| name                  | String          | Name of the input form element. Should be the same as the form field key. |    
| onChange              | Func            | onChange prop provided by Form library.              |
| style             | Object           | Style prop |
| value                 | String | Value of the input field. HH:MM <24 hour>                 |

##### Usage
Ex.
```
import React from 'react'
import {TimePicker, Form, ValidateForm} from 'react-native-form-library'

class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        time: ''
      }
    }
  }
  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <TimePicker
        name='time'
        onChange={updateProperty}
        value={form.time}
      />
    )
  }
}

export default ValidateForm(Form(Class, 'form'))
```


##### Usage
Ex.
#### Recommended Usage of Components
It is recommended that you wrap these components in your own component, defining the styles in the component wrapper. This way, you do not have to provide style classes to every form element you use.
Ex.

```
import React from 'react'
import {Input} from 'react-native-form-library'
class InputField extends React.Component {
  render () {

    return (
      <Input
        containerStyle={containerStyle}
        containerActiveStyle={containerActiveStyle}
        containerErrorStyle={containerActiveStyle}
        inputStyle={inputStyle}
        inputActiveStyle={inputActiveStyle}
        inputErrorStyle={inputErrorStyle}
        labelStyle={labelStyle}
        labelActiveStyle={labelActiveStyle}
        labelErrorStyle={labelErrorStyle}
        {...this.props}
      />
    )
  }
}

export default InputField

class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        profile: {
          first_name: ''
        }
      }
    }
  }
  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <InputField
        error={formErrors.profile && formErrors.profile.first_name}
        label="First Name"
        name="profile.first_name"
        onBlur={() => console.log("onBlur")}
        onChange={updateProperty}
        onFocus={() => console.log("onFocus")}
        placeholder="First Name"
        value={form.profile.first_name}
      />
    )
  }
}
export default ValidateForm(Form(Class, 'form'))
```

## License
Copyright (2017)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
