# NeuralNetworkTool 

## 0. Warning
This is a pre-alpha version of the system. Many of the following may be changed in the near or far future.
The logical component of the system has not been published yet, then many of the functionalities are not available in public.

## 1. Introduction
NeuralNetworkTool is an application allowing the user to create, visualise an artificial neural network(in a nutshell - ANN) using a graphical user interface. Moreover the tool owns a built-in functionality to run the whole process of machine learning including basic preprocessing, selecting types of the input data, creating a logical model(network) that is able to learn from the data.

##  2. Usage

When starting the application, an user encounters the entry, simple form.

<p align="center">
<img src="./assets/gif/app-1.gif" alt="app-1 gif" align="center" />
 <p>
<p align ="center">Figure 1. Project's name entry form submission</p>

 He is asked for entitling the project he is going to create in the near future. The title should match the following regular expression <i>/^[a-zA-Z0-9].*$/</i>
 
After submitting the project's name, we are moving the real part of the application - ANN's creator. The user has an access to layers' editor, where we can create, delete and modify extisting (or not!) ann's parts. An exemplary usage is presented on the Figure 2, there is an opportunity to parametrize the layers, the network, and learning process with the available tools. 

<img src="./assets/gif/app-2.gif" alt="app-2 gif" align="center" />
<p align="center">Figure 2. Building the model's architecture and input training data</p>
<img src="./assets/gif/app-3.gif" alt="app-3 gif" align="center" />
<p align="center">Figure 3. Selecting the input data, training, viewing the trained model</p>

## 3. Specification

The system is built of 2 main components:
* Web application - Front of the software, responsible for handling users' actions, creating/uploading models using UI.
* API - Building & training neural network with Keras framework.

The Integrated API is available under this [link](https://github.com/lukasy09/NeuralNetworkAPI)(It is not published yet!)

List of functional requirements imposed on the whole software. 

- [x] Creating ANNs from scratch using GUI 
- [x] ANNs' Visualisation
- [x] Model's parametrization(layers + compilation characteristics)
- [x] Training's parametrization
- [x] Uploading keras model in JSON format
- [x] Uploading the training data
- [x] Selecting data classtypes(numerical/categorical)
- [x] Training model on the data and chosen parameters
- [x] Storing user's model in NoSql database
- [ ] Proposing best model for given data
- [ ] Projecting multiple architectural networks(like CNN or RNN)


