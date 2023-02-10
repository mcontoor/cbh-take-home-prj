# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
1. Moved out the repeated code to a separate fn `createHash` in accordance of DRY principle
2. Removed too many if else cases
3. First checking for event.partitionKey. If it exists, we can move to the validation of type and string length
3. Else if event object exists then we create a hash of it and then pass it forward for the type and string length validation
5. Instead of assigning candidate as `TRIVIAL_PARTITION_KEY` , the function is simply returning `TRIVIAL_PARTITION_KEY` if candidate is null or undefined.

The refactored function has separated all cases without need of multiple if-else statements making it more readable than the original function.