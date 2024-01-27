# PDDL Plan Emulator for Peg Solitaire

## Overview

This project serves as an emulator for executing plans generated from PDDL (Planning Domain Definition Language) in the context of the Peg Solitaire game, specifically designed for a triangular board layout. It interprets and visualizes the steps outlined in a PDDL-generated plan, allowing users to input a sequence of moves and observe their execution on the game board.

## Customizing PDDL Problems

To accommodate different PDDL problems, you can modify the `boardstate.js` file to represent various initial and goal states of the Peg Solitaire board. This flexibility enables the visualization of a wide range of PDDL-generated solutions.

## Features

- **PDDL Plan Interpretation**: Execute PDDL-generated plans with the format `(bicie pxy pxy pxy)`, where `pxy` denotes a peg at row `x` and position `y`.
- **Interactive Triangular Board**: A dynamic, web-based board layout for intuitive visualization of the game's progress.
- **Step-by-Step Execution**: Visualize each action in the PDDL plan with an adjustable delay, offering insights into the plan's stepwise execution.
- **Final State Validation**: Automatically compares the end state of the board with the predefined goal state, providing immediate feedback on the plan's success.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge) is required to run the emulator.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/<your-username>/pddl-peg-solitaire-emulator.git
2. **Launch the Emulator**

Open index.html in your web browser to start the emulator.

### Usage
1. **Input PDDL Plan**: Paste the PDDL-generated plan into the provided textarea. Ensure the format follows the (bicie pxy pxy pxy) structure.

2. **Execute Plan**: Click the Run button to begin the step-by-step execution of the plan. Monitor the board to see how each action modifies the game state.

3. **Adjust Execution Speed**: Use the delay input field to set the time interval between each move, tailoring the execution speed to your preference.

4. **Reset Board**: Click the Reset button at any time to revert the board to its initial state and input a new plan.
