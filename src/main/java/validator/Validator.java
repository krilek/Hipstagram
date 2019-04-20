package validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validator {
    public static boolean validate(String input, AppPattern p) {
        Pattern pattern = Pattern.compile(p.getPattern());
        Matcher matcher = pattern.matcher(input);
        return matcher.matches();
    }
}
