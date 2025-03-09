# Dual Transaction
This transaction will send ADA and delegate to a DRep at the same time. 

# Getting started 
<h3>Lucid Evolution</h3>
<a href="https://anastasia-labs.github.io/lucid-evolution/install">Lucid Evolution</a> is an off-chain framework for Cardano.

<h3>Blockfrost</h3>
For this transaction, you will need a <a href="https://blockfrost.io/" target="_blank">Blockfrost</a> account. There, you can create your project and retrieve your <code>project_id</code>.
<br> Learn more about registration and where to find your Blockfrost token here: https://blockfrost.dev/overview/getting-started

You can also find more information by reading the Blockfrost <a href="https://docs.blockfrost.io/">Documentation</a>

<h3>Node.js</h3>
This repo requires Node.js to run. You can this install by going to the official <a href="https://nodejs.org/en">Node.js website</a>.

# Installation
To clone the repository, use the following command:
<code>git clone https://github.com/opacular/dualtransaction.git</code>

When you have cloned the repository, use the command <code>npm install</code> in terminal to install Lucid Evolution. 

Create two <code>.env</code> files. One for <code>.env.preprod</code> and one for <code>.env.mainnet</code>. Here, you input the information that will be used when running the code. See <code>.env.example</code> for the fields required. 

When both <code>.env</code> files have been created and you have filled out the neccessary information, use the follwoing commands in your terminal to run the code: <code>npm run preprod</code> or <code>npm run mainnet</code>. 