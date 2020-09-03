/*
  Consider: 

  text - a b c d a b x a b c d a b c d a b c y
                     ^

  pattern - a b c d a b c y
                        ^
   
  'c' and 'x' don't match, so we check the substring before 'c', 
  'abcdab', if there is a suffix which is also a prefix, we get 
  'a b c d a b'. That means, since we have matched till 'x' till                        
   ^ ^     ^ ^ 
   till this point, the character right before 'x' must be 'ab',
   since 'ab' is also a prefix, we don't have to match 'ab' again
   and the next match can start from 'x' and 'c' at index 2:
   
        text - a b c d a b x a b c d a b c d a b c y
                           ^

        pattern - a b c d a b c y
                      ^
  What happened here is we didn't have to look backwards in the 
  string/text to see where to start the next match from. In other
  words, we use suffix to skip prefix.
  
  In the naive approach, we will start from 'b' at index 1 and 
  reset the index of the pattern to 0. 



  Consider: 

  text - a a b a b a
             ^

  pattern - a a b
                ^
  
  Pattern found in the text. Thus we need to find out where to start 
  the next match from, in other words, how many characters in the 
  pattern we can skip. Neither the suffix 'b' or 'ab' is prefix, 
  thus we can not skip any characters:

        text - a a b a b a
                     ^

        pattern - a a b a b a
                  ^
                 
  
  Consider: 
  
  text - a b a c b a
             ^

  pattern - a b a 
                ^
               
  Pattern found in the text. The suffix 'a' is also a prefix, 
  thus we can skip 'a' at index 0 and start from 'b':
  
        text - a b a c b a
                     ^

        pattern - a b a              
                    ^


  Consider:
  
  text - a a a a a b a a a b a
               ^

  pattern - a a a a
                  ^
                  
  Pattern found in the text. The suffix 'aaa' is also a prefix,
  thus we can skip the prefix 'aaa' and start from 'a' at index 3:
  
        text - a a a a a b a a a b a
                       ^

        pattern - a a a a
                        ^
*/

function kmpSearch(txt, pat) {
  const txtLen = txt.length;
  const patLen = pat.length;

  // If the length of pat is greater than the length of txt,
  // there is no need to search the pattern in txt.
  if (txtLen < patLen) return 'Pattern not found.';

  const lps = computeLPSArray(pat);
  const results = [];

  // Set i to 0
  let i = 0;
  // Set j to 0
  let j = 0;
  // While i < txt.length
  while (i < txtLen) {
    // while j > 0 and txt[i] does not equals pat[j],
    // set j to lps[j - 1]
    while (j > 0 && txt[i] !== pat[j]) {
      j = lps[j - 1];
    }
    // if txt[i] equals pat[j], increase j by 1.
    if (txt[i] === pat[j]) j++;
    // If j equals pat.length, that means pattern is found, push the
    // index at which pattern is found to the results, if j > 0,
    // set j to lps[j - 1].
    if (j === patLen) {
      results.push(i + 1 - patLen);
      if (j > 0) j = lps[j - 1];
    }
    // Increase i by 1
    i++;
  }
  return results.length ? results : 'Pattern not found.';
}

// Preprocess the pattern and compute LPS array, so that we can know how many characters
// to skip during pattern matching.

// Consider str = 'ababaca'
// When index = 0, str = 'a', there is no proper prefix that matches a proper suffix; lps = [0]
// When index = 1, str = 'ab', proper prefix is 'a', proper suffix is 'b', they are not matching;
// lps = [0, 0]
// When index = 2, str = 'aba', proper prefix: {'a', 'ab'}, proper suffix: {'ba', 'a'},
// thus 'a' is proper prefix that matches proper suffix, and the length of the longest proper
// prefix that matches proper suffix is 1; lps = [0, 0, 1].
// Continue until index = 7.
function computeLPSArray(pat) {
  // Set the length of the previous longest prefix suffix to 0
  let len = 0;

  // Initialize lps array and set its first item to 0,
  // cause lps[0] is always 0
  const lps = [0];

  // For i from 1 to pattern.length - 1
  for (let i = 1; i < pat.length; i++) {
    // Consider str = 'ababaca'

    // i = 1, len = 0, lps = [0]
    // str[i] = 'b', str[len] = 'a', they do not match.
    // Cause len is already 0, set lps[1] to len, lps = [0, 0]

    // i = 2, len = 0, lps = [0, 0]
    // str[i] = 'a', str[len] = 'a', they match.
    // The longest prefix suffix is 'a'.
    // Increase len by 1, len = 1, set lps[2] to len, lps = [0, 0, 1]

    // i = 3, len = 1, lps = [0, 0, 1]
    // str[i] = 'b', str[len] = 'b', they match.
    // The longest prefix suffix is 'ab'.
    // Increase len by 1, len = 2, set lps[3] to len, lps = [0, 0, 1, 2]

    // i = 4, len = 2, lps = [0, 0, 1, 2]
    // str[i] = 'a', str[len] = 'a', they match.
    // The longest prefix suffix is 'aba'.
    // increase len by 1, len = 3, set lps[4] to len, lps = [0, 0, 1, 2, 3]

    // i = 5, len = 3, lps = [0, 0, 1, 2, 3]
    // str[i] = 'c', str[len] = 'b', thus we got new prefix 'abab' and suffix 'abac',
    // they do not match. Thus we need to find out the next value of len which we
    // need for comparing with str[i]. The previous longest prefix suffix
    // length is 'aba' and it doesn't match 'bac', thus we try to find
    // out whether 'ab' matches 'ac', in other words, we try to find out
    // whether they match when we decrease the length of prefix suffix by 1

    while (len > 0 && pat[i] !== pat[len]) {
      len = lps[len - 1];
    }
    // If pattern[i] is equal to pattern[len], increase
    // len by 1 and set lps[i] to len.
    if (pat[i] === pat[len]) {
      len++;
      lps[i] = len;
    } else {
      lps[i] = 0;
    }
  }

  // return lps
  return lps;
}

const text = 'AAAAABAAABA';
const pattern = 'AAAA';
console.log(kmpSearch(text, pattern));
