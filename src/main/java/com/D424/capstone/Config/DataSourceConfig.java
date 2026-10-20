package com.D424.capstone.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.io.File;

@Configuration(proxyBeanMethods = false)
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.sqlite.JDBC");
        
        String tempDir = System.getProperty("java.io.tmpdir");
        String dbPath = tempDir + File.separator + "my_db.db";

        dataSource.setUrl("jdbc:sqlite:" + dbPath);
        return dataSource;
    }
}
