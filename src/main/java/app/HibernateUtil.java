package app;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {

    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {

        if (sessionFactory == null) {

            try {

                Configuration configuration = new Configuration().configure("/hibernate.cfg.xml");
//
//                ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
//
//                        .applySettings(configuration.getProperties()).build();

                sessionFactory = configuration.buildSessionFactory();

            } catch (Exception e) {

                e.printStackTrace();

            }

        }

        return sessionFactory;

    }

}