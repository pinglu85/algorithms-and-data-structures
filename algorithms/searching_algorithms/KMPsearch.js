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
    }
    // while j > 0 and txt[i] does not equals pat[j],
    // set j to lps[j - 1]
    while (j > 0 && txt[i] !== pat[j]) {
      j = lps[j - 1];
    }

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
function computeLPSArray(pat, patLen) {
  // Set the length of the previous longest prefix suffix to 0
  let len = 0;

  // Initialize lps array and set its first item to 0,
  // cause lps[0] is always 0.
  // The lps array stores the length of the longest prefix suffix
  // in the (sub)pattern, from 0 index to the current index.
  // It is used to find out how many characters we can skip and
  // which index we should start at. For example, the pattern is 'aba',
  // the longest prefix suffix is 'a', the length is 1, thus we can skip
  // 'a' and start at index 1, namely 'b'.
  const lps = [0];

  // For i from 1 to patLen - 1
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
      str[i] = 'c', str[len] = 'b', we got new prefix 'abab' and suffix 'abac',
      they do not match, thus we can not increase the longest prefix suffix length 
      based on the current length which is 3. We need to figure out what should be 
      the next str[len] we need to compare with str[i]. We may want to increment 
      it based on the longest prefix suffix with length that is less than current length 3.
      It is 'a' and the length is 1. We then compare if 'ab' equals 'ac'. They are not. 
      Then we are going to find out the longest prefix suffix with length that is less than 
      the length 1. That is 0. We compare 'a' at index 0 with 'c', they don't match; we 
      push 0 to the lps array. We increase i by 1, i = 6, len = 0, lps = [0, 0, 1, 2, 3, 0].

      Consider another example 'abaa', when i = 2, we get the longest prefix suffix 'a', 
      whose length is 1, lps = [0, 0, 1]. When i = 3, we get 'a'. We are going to find 
      out if we could increase the length. Since the length of the current longest prefix 
      suffix is 1, we can skip 'a' and start from index 1, which means we compare 'b' with 'a', 
      in other words, we check if 'ab' equals 'aa' so as to find out whether we can increase 
      the current prefix suffix length. 
          
          pattern: a b a a 
                     ^   ^       
                    len  i
      
      They doesn't match, we decrease the len pointer by 1, the len pointer is now at
      position 0, which is one position before the previous position. In other words, the len 
      pointer is now at the last character of the previous prefix suffix. Now we need to find 
      out how many characters we can skip / where can we start from at position 0, which is 0.
      In other words, we are trying to find out whether we can increase the length of longest
      prefix suffix based on the prefix suffix whose length is less than the current one which 
      is 1, which means based on the previous prefix suffix. We compare the character at index 0,
      which is 'a' with pattern[i] = 'a', they match, we increase len by 1, len = 1.
      

      Consider another example 'ababeababc', i = 9, len = 4, the current longest prefix
      suffix is 'abab', lps = [0, 0, 1, 2, 0, 1, 2, 3, 4]. We are going to find out if we 
      can increase the length of longest prefix suffix. Since len is 4, we compare the character
      at index 4 which is 'e' with pat[i] which is 'c'. They don't match, we cannot increase 
      the length based on the current longest prefix suffix 'abab'. 

          patten: a b a b e a b a b c
                          ^         ^
                         len        i

          lps:    0 0 1 2 0 1 2 3 4

      We are going to find out whether we can increase the length based on the length of previous 
      prefix suffix which is 'ab'. We point the len to the last item of the current longest prefix 
      suffix which is index of 'b' by decreasing len by 1, then we can use this index which is 3 to 
      look up the lps table, so as to find out the length of previous prefix suffix, namely 'ab'. 
      That means we can skip 'ab' and start at 'a'. We compare 'a' with 'c', they don't match. 
      
          patten: a b a b e a b a b c
                      ^             ^
                     len            i

          lps:    0 0 1 2 0 1 2 3 4

      We decrease len by 1 again, and we are going to find out whether we can increase the length 
      based on the length of previous prefix suffix which is 0, there is no prefix suffix in 'ab'.
      We compare 'a' with 'c', they don't match. That means we don't have prefix suffix at character
      'c', thus we set lps[9] to 0.    
  */

    // If pat[i] is equal to pat[len], increase
    // the length of longest prefix suffix by 1
    // and set lps[i] to that value, increase i by 1.
    if (pat[i] === pat[len]) {
      len++;
      lps[i] = len;
      i++;
    }
    // If pat[i] doesn't equal pat[len] and the length of previous
    // longest prefix suffix is not 0, that means we may increment
    // the len based on the prefix suffix with length < current length.
    // Set len to the (len - 1)th item of the lps array, so that we can
    // find out the length of longest prefix suffix within the current
    // prefix suffix and compare pat[i] with the character that follows
    // the prefix suffix. Iterate until either pat[i] equals pat[len]
    // or len = 0.
    // If the length of longest prefix suffix is 0 and pat[i] doesn't
    // equal pat[len], that means we cannot find longest prefix suffix at
    // index i, we push 0 to the lps array and increase i by 1.
    else {
      if (len > 0) {
        len = lps[len - 1];
      } else {
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
