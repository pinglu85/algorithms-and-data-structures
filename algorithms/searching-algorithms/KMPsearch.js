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

  const lps = computeLPSArray(pat, patLen);
  const results = [];

  // index for txt
  let i = 0;
  // index for pat
  let j = 0;

  // Loop over txt
  while (i < txtLen) {
    // if txt[i] equals pat[j], increase j and i by 1 apparently.
    if (txt[i] === pat[j]) {
      j++;
      i++;
    }

    // If j equals the length of pattern, that means pattern is found,
    // push the index from which pattern is found to the results.
    // Set j to lps[j - 1].
    if (j === patLen) {
      results.push(i - j);
      j = lps[j - 1];
    } else if (i < txtLen && txt[i] !== pat[j]) {
      if (j > 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return results.length ? results : 'Pattern not found.';
}

// Preprocess the pattern and compute LPS array, so that we can know how many characters
// we can skip during pattern matching.
// Consider str = 'ababaca'
// When index = 0, str = 'a', there is no proper prefix that matches a proper suffix; lps = [0]
// When index = 1, str = 'ab', proper prefix is 'a', proper suffix is 'b', they don't match;
// lps = [0, 0].
// When index = 2, str = 'aba', proper prefix: {'a', 'ab'}, proper suffix: {'ba', 'a'},
// thus 'a' is proper prefix that matches proper suffix, and the length of the longest proper
// prefix that matches proper suffix is 1; lps = [0, 0, 1].
// Continue until index = 7.
function computeLPSArray(pat, patLen) {
  // Set the length of the previous longest prefix suffix to 0
  let len = 0;

  // Initialize lps array and set its first item to 0,
  // cause lps[0] is always 0.
  // The lps array stores the length of the longest prefix suffix
  // in the (sub)pattern, from 0 index to the current index.
  // It is used to find out how many characters from the beginning of the pattern
  // we can skip, in other words, which index we should start next match from.
  // For example, the pattern is 'aba', the longest prefix suffix is 'a',
  // the length is 1, thus we can skip 'a' and start from index 1, namely 'b'.
  const lps = [0];

  // Loop over the pattern from 1th character to the last character.
  let i = 1;
  while (i < patLen) {
    /* 
      Consider str = 'ababaca'

      i = 1, len = 0, lps = [0]
      str[i] = 'b', str[len] = 'a', they do not match.
      Cause len is already 0, set lps[1] to len, lps = [0, 0]

      i = 2, len = 0, lps = [0, 0]
      str[i] = 'a', str[len] = 'a', they match.
      The longest prefix suffix is 'a'.
      Increase len by 1, len = 1, set lps[2] to len, lps = [0, 0, 1]

      i = 3, len = 1, lps = [0, 0, 1]
      str[i] = 'b', str[len] = 'b', they match.
      The longest prefix suffix is 'ab'.
      Increase len by 1, len = 2, set lps[3] to len, lps = [0, 0, 1, 2]

      i = 4, len = 2, lps = [0, 0, 1, 2]
      str[i] = 'a', str[len] = 'a', they match.
      The longest prefix suffix is 'aba'.
      increase len by 1, len = 3, set lps[4] to len, lps = [0, 0, 1, 2, 3]

      i = 5, len = 3, lps = [0, 0, 1, 2, 3]
      str[i] = 'c', str[len] = 'b', we get new prefix 'abab' and suffix 'abac',
      they do not match, thus we cannot build a new longest prefix suffix based on the 
      previous longest prefix suffix 'aba' and increase the length.
      We need to find out what should be the next character we need to compare with str[i].
      We check the prefix part of the previous longest prefix suffix 'aba', so as to find out
      the next match we can start from, in other words, how many characters from the beginning of 
      the pattern we can skip. 
            
          pattern: a b a b a c
                         ^   ^   
                        len  i
                       ^                 
      The prefix suffix in 'aba' is 'a', therefore we can skip 'a' and 
      start the next match from 'b'. 

          pattern: a b a b a c
                     ^       ^   
                    len      i
                       
      'b' and 'c' don't match, in other words, 'ab' and 'ac' don't match. Therefore, we cannot
      increase the length of prefix suffix based on the prefix suffix 'a' with length = 1.
      We check the prefix part of the previous prefix suffix 'a' to find out how many 
      characters we can skip. 
      
          pattern: a b a b a c
                     ^       ^   
                    len      i
                   ^

      We are already at index 0, we cannot skip any characters, we compare 'a' with 'c',
      they don't match, we push 0 to the lps array. 
      To sum it up, if there is a mismatch and the length of previous prefix suffix is not 0, 
      we recursively check the prefix suffix within the current prefix suffix to find 
      out how many characters from the beginning of the pattern we can skip, which determines
      where we can start the next match from, until we find a match or we reach the first 
      character of the pattern.  
      You can also understand it like this: although we can not increase the length of 
      prefix suffix based on the length of previous prefix suffix, we may want to increment 
      it based on the longest prefix suffix within the current longest prefix suffix.
  
      Consider another example 'acacabacacabacacac'.

          pattern: a c a c a b a c a c a b a c a c a c
                                         ^           ^  
                                        len          i

      Previous longest prefix suffix is 'a c a c a b a c a c a'.
      There is a mismatch, we need to find out what should be the next character we need to 
      compare with 'c'. We check the prefix suffix 'a c a c a b a c a c a' and find out 
      'a c a c a' is the longest prefix suffix, thus we can start the next match from 'b'.
      In other words, we try to find out if we could build a new prefix suffix based on 
      'a c a c a':
 
          pattern: a c a c a b a c a c a b a c a c a c
                             ^                       ^  
                            len                      i

      'b' and 'c' don't match. We check the prefix suffix  'a c a c a' and get the prefix
      suffix 'a c a'. So we can skip 'a c a' and start the next match from 'c':

          pattern: a c a c a b a c a c a b a c a c a c
                         ^                           ^  
                        len                          i

      They do match. Thus when pattern = 'a c a c a b a c a c a b a c a c a c', the 
      longest prefix suffix is 'a c a c' with length 4.                  

  */

    // If pat[i] is equal to pat[len], increase
    // the length of longest prefix suffix by 1
    // and set lps[i] to that value, increase i by 1.
    if (pat[i] === pat[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      // If pat[i] doesn't equal pat[len] and the length of previous
      // longest prefix suffix is not 0, recursively find out the longest prefix
      // suffix within the previous longest prefix suffix, so as to know
      // how many characters from the beginning of the pattern we can skip, until
      // there is a match or the first character of the pattern is reached.
      if (len > 0) {
        len = lps[len - 1];
      }
      // If the length of longest prefix suffix is 0 and pat[i] doesn't
      // equal pat[len], that means we cannot find longest prefix suffix at
      // index i, we push 0 to the lps array and increase i by 1.
      else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

const text = 'AAAAABAAABA';
const pattern = 'AAAA';
console.log(kmpSearch(text, pattern));
