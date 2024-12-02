package main

import (
	"fmt"
	"math"
	"os"
	"slices"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	// Load input file
	data, err := os.ReadFile("../input.txt")
	check(err)

	// Convert loaded data into string format
	// After that, split the string on newlines, creating an array of strings
	str_data := string(data)
	data_array := strings.Split(str_data, "\n")

	// Print input for tshoot purposes
	//fmt.Println(str_data)

	// Declare slices for storing each column in the input
	var first_array []int
	var second_array []int

	// Declare hasmaps to store count of each number in each column
	var second_map = make(map[string]int)

	for _, line := range data_array {

		// Last line will be empty, skip this one
		if line == "" {
			continue
		}

		// Formatting print for ease of troubleshooting
		//fmt.Printf("LINE: %s\n", line)

		// Split each row based on 3 whitespace characters, creating a new slice where 2 indices are first and second column from the input file
		numbers := strings.Split(line, "   ")

		// Convert first and second column from string to integer
		first_number, _ := strconv.Atoi(numbers[0])
		second_number, _ := strconv.Atoi(numbers[1])

		// Append both numbers to their respective arrays
		first_array = append(first_array, first_number)
		second_array = append(second_array, second_number)

		// Fill the hashmaps with appropariate values
		second_map[numbers[1]] = second_map[numbers[1]] + 1
	}

	// Sort arrays
	slices.Sort(first_array)
	slices.Sort(second_array)

	// Var for storing result
	var result_part_1 int
	var result_part_2 int

	// Loop through both arrays and calculate the absolute distance for each row
	// Look for each element from the first_array in the second_map by key and check the value
	for i := 0; i < len(first_array); i++ {
		// First part
		diff := first_array[i] - second_array[i]
		abs_diff := math.Abs(float64(diff))
		result_part_1 = result_part_1 + int(abs_diff)

		// Second part
		frequency_of_element := second_map[strconv.Itoa(first_array[i])]
		result_part_2 = result_part_2 + (first_array[i] * frequency_of_element)
	}

	fmt.Println("Part 1 final result is: ", result_part_1)
	fmt.Println("Part 2 final result is: ", result_part_2)
}
