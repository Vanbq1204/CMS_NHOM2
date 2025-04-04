package CMS;


/**
 * Generated from IDL interface "EmailMarketingService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class EmailMarketingServiceHelper
{
	private volatile static org.omg.CORBA.TypeCode _type;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			synchronized(EmailMarketingServiceHelper.class)
			{
				if (_type == null)
				{
					_type = org.omg.CORBA.ORB.init().create_interface_tc("IDL:CMS/EmailMarketingService:1.0", "EmailMarketingService");
				}
			}
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final CMS.EmailMarketingService s)
	{
			any.insert_Object(s);
	}
	public static CMS.EmailMarketingService extract(final org.omg.CORBA.Any any)
	{
		return narrow(any.extract_Object()) ;
	}
	public static String id()
	{
		return "IDL:CMS/EmailMarketingService:1.0";
	}
	public static EmailMarketingService read(final org.omg.CORBA.portable.InputStream in)
	{
		return narrow(in.read_Object(CMS._EmailMarketingServiceStub.class));
	}
	public static void write(final org.omg.CORBA.portable.OutputStream _out, final CMS.EmailMarketingService s)
	{
		_out.write_Object(s);
	}
	public static CMS.EmailMarketingService narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
		{
			return null;
		}
		else if (obj instanceof CMS.EmailMarketingService)
		{
			return (CMS.EmailMarketingService)obj;
		}
		else if (obj._is_a("IDL:CMS/EmailMarketingService:1.0"))
		{
			CMS._EmailMarketingServiceStub stub;
			stub = new CMS._EmailMarketingServiceStub();
			stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
			return stub;
		}
		else
		{
			throw new org.omg.CORBA.BAD_PARAM("Narrow failed");
		}
	}
	public static CMS.EmailMarketingService unchecked_narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
		{
			return null;
		}
		else if (obj instanceof CMS.EmailMarketingService)
		{
			return (CMS.EmailMarketingService)obj;
		}
		else
		{
			CMS._EmailMarketingServiceStub stub;
			stub = new CMS._EmailMarketingServiceStub();
			stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
			return stub;
		}
	}
}
