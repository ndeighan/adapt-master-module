#adapt-textFeedback

An Adapt component that allows the learner to leave feedback comments.

##Installation

First, be sure to install the [Adapt Command Line Interface](https://github.com/cajones/adapt-cli), then from the command line run:-



##Usage

Once installed, the component can be used to create a text feedback field allowing the user to leave feedback comments. 


##Settings overview

For example JSON format, see [example.json].

Further settings for this component are:

####_component

This value must be: `textinput`

####_classes

You can use this setting to add custom classes to your template and LESS file.

####_layout

This defines the position of the component in the block. Values can be `full`, `left` or `right`. 

####_attempts

Default: `1`

Specifies the number of attempts for this question.

####placeholder

The placeholder setting specifies a short hint that describes the expected value of the input field.

####_allowsAnyCase

Default: `true`

Set this value to `false` to make the user match the case for each answer.

####_allowsPunctuation

Default: `true`

If set to `true` allows the following punctuation/characters within the answer:

```
) ( ~ ` _ - = } { : ; * & ^ % £ $ ! # - / , .`
```

####_items

Each item represents one one text input box for this question and contains values for `prefix`, `suffix` and `_answers`.

####prefix

Text entered in this setting will appear before the input area.

####suffix

Text entered in this setting will appear after the input area.

####_answers

Multiple answers can be entered in this setting, for example:

```
            "_answers": [
                "2",
                "two"
            ]
```

##Limitations
 
To be completed.

##Browser spec

This component has been tested to the standard Adapt browser specification.