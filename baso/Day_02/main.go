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

func loadInput() string {
	data, err := os.ReadFile("./input.txt")
	check(err)
	str_data := string(data)

	return str_data
}

func checkReportIsSafe(report string) bool {
	// Convert the string into an array of integers
	report_array := strings.Split(report, " ")
	var report_integers []int

	for _, number := range report_array {
		number_int, _ := strconv.Atoi(number)
		if number_int == 0 {
			continue
		}
		report_integers = append(report_integers, number_int)
	}
	// At this point, the report_integers slice contains numeric values of 1 row in the input

	// Report is safe if levels are either all increasing or all decreasing AND
	if slices.IsSorted(report_integers) == false {
		slices.Reverse(report_integers)
		if slices.IsSorted(report_integers) == false {
			return false
		}
	}
	// Report is safe if two adjacent levels differ by at least one and at most three
	for i := 0; i < len(report_integers)-1; i++ {
		diff := report_integers[i] - report_integers[i+1]
		diff_abs := math.Abs(float64(diff))

		if diff_abs > 3 || diff_abs < 1 {
			return false
		}
	}
	return true

	// Check if the report is safe
}

func checkReportIsSafePart2(slice []int) bool {
	// Report is safe if levels are either all increasing or all decreasing AND
	if slices.IsSorted(slice) == false {
		slices.Reverse(slice)
		if slices.IsSorted(slice) == false {
			return false
		}
	}
	// Report is safe if two adjacent levels differ by at least one and at most three
	for i := 0; i < len(slice)-1; i++ {
		diff := slice[i] - slice[i+1]
		diff_abs := math.Abs(float64(diff))

		if diff_abs > 3 || diff_abs < 1 {
			return false
		}
	}
	return true
}

func deleteElementFromSlice(slice []int, index int) []int {
	ret := make([]int, 0)
	ret = append(ret, slice[:index]...)
	return append(ret, slice[index+1:]...)
}

func solvePart1(input_data string) {
	// Split the string based on rows
	data_array := strings.Split(input_data, "\n")
	result := 0

	for _, line := range data_array {
		lineIsSafe := checkReportIsSafe(line)
		if lineIsSafe {
			result = result + 1
		}
	}

	fmt.Printf("Total number of safe lines in part 1 is: %d\n", result)
}

func solvePart2(input_data string) {
	// Split the string based on rows
	data_array := strings.Split(input_data, "\n")
	result := 0

	for _, line := range data_array {
		lineIsSafe := checkReportIsSafe(line)
		if lineIsSafe {
			result = result + 1
		} else {
			// If the line is not safe by the standards in part 1
			// Convert to array of numbers and check then
			report_array := strings.Split(line, " ")
			var report_integers []int

			for _, number := range report_array {
				number_int, _ := strconv.Atoi(number)
				if number_int == 0 {
					continue
				}
				report_integers = append(report_integers, number_int)
			}

			// At this point, report_integers holds the slice of integers
			for i := 0; i < len(report_integers); i++ {
				modified_slice := deleteElementFromSlice(report_integers, i)
				lineIsSafe = checkReportIsSafePart2(modified_slice)
				if lineIsSafe {
					result = result + 1
					break
				}
			}

		}
	}

	fmt.Printf("Total number of safe lines in part 2 is: %d\n", result)
}

func main() {
	data := loadInput()
	solvePart1(data)
	solvePart2(data)
}
