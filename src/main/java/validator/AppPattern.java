package validator;

public enum AppPattern {
    Email("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$"),
    Login("^[a-zA-Z0-9]{4,}$"),
    Password("^[a-zA-Z0-9]{4,}$");
//    Password("((?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%!]).{8,40})");

    private final String pattern;

    AppPattern(String p) {
        pattern = p;
    }

    public String getPattern() {
        return pattern;
    }
}
