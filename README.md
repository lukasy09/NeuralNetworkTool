# NeuralNetworkTool 

## 1. Introduction
NeuralNetworkTool is an application allowing the user to create, visualise an artificial neural network(in a nutshell - ANN) using a graphical user interface. Moreover the tool owns a built-in functionality to run the whole process of machine learning including basic preprocessing, selecting types of the input data, creating a logical model(network) that is able to learn from the data.

##  2. Usage

When starting the application, an user encounters the entry, simple form.
<img src="./assets/gif/app-1.gif" alt="app-1 gif" align="center" />
<label>Figure 1. Project's name entry form submission</label>

 He is asked for entitling the project he is going to create in the near future. The title should match the following regular expression <i>/^[a-zA-Z0-9].*$/</i>
 
After submitting the project's name, we are moving the real part of the application - ANN's creator. The user has an access to layers' editor, where we can create, delete and modify extisting (or not!) ann's parts. An exemplary usage is presented on the Figure 2, there is an opportunity to parametrize the layers, the network, and learning process with the available tools. 

<img src="./assets/gif/app-2.gif" alt="app-2 gif" align="center" />
<label>Figure 2. Building the model's architecture and input training data</label>

<img src="./assets/gif/app-3.gif" alt="app-3 gif" align="center" />
<label>Figure 3. Selecting the input data, training, viewing the trained model</label>

## 3. Specification

The system is built of 2 main components:
* Web application - Front of the software, responsible for handling users' actions, creating/uploading models using UI.
* API - Building & training neural network with Keras framework.

Integrated API is available under this [link](https://github.com/lukasy09/NeuralNetworkAPI)(It is not published yet!)


