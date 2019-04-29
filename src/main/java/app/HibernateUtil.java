package app;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {

    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {

        if (sessionFactory == null) {
            try {
                Configuration configuration = new Configuration().configure(HibernateUtil.class.getResource("/hibernate.cfg.xml"));
                String dbPath = HibernateUtil.class.getResource("/hipstagram.db").getPath();
                configuration.setProperty("hibernate.connection.url", String.format("jdbc:sqlite:%s", dbPath));
                sessionFactory = configuration.buildSessionFactory();

            } catch (Exception e) {

                e.printStackTrace();

            }

        }

        return sessionFactory;

    }

}